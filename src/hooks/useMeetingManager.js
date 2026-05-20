import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Orchestrates the meeting entry lifecycle (creation and joining).
 * 
 * Acts as a facade over the routing and auth layers, caching intended destinations
 * in `localStorage` to preserve user intent when authentication interrupts the flow.
 */
export function useMeetingManager() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Controlled inputs
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isJoinMeeting, setIsJoinMeeting] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showJoinDialog, setShowJoinDialog] = useState(false);

    // Controlled inputs
    const [meetingCode, setMeetingCode] = useState('');
    const [error, setError] = useState('');

    /**
     * Provisions a new room in the backend database. If unauthenticated, defers creation
     * by surfacing the auth modal. `handleAuthSuccess` will complete the flow.
     */
    const startNewMeeting = useCallback(async () => {
        if (user) {
            try {
                const res = await fetch(`${API}/api/meetings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ hostId: user.uid, title: 'Quick Meeting' }),
                });
                const { meeting } = await res.json();
                navigate(`/meeting/${meeting.roomId}`);
            } catch (e) {
                console.error('[MEETING_CREATE_HERO]', e);
            }
        } else {
            setShowSignIn(true);
            setDialogOpen(true);
        }
    }, [user, navigate]);

    /**
     * Validates and processes meeting joins originating from the primary hero form.
     * Prevents unauthenticated joins directly at the form level.
     */
    const joinMeeting = useCallback((e) => {
        if (e) e.preventDefault();

        if (!user) {
            setShowJoinDialog(true);
            return;
        }

        const cleanCode = meetingCode.trim();
        if (!cleanCode) {
            setError('Please enter a valid meeting code');
            return;
        }

        const isValidFormat = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/.test(cleanCode);
        if (!isValidFormat) {
            setError('Code must be in xxxx-xxxx-xxxx format');
            return;
        }

        navigate(`/meeting/${cleanCode}`);
    }, [user, meetingCode, navigate]);

    /**
     * Processes manual join attempts, typically from secondary modals.
     * Caches the target code in storage to survive the OAuth/Login redirect cycle.
     */
    const handleManualJoin = useCallback(() => {
        const cleanCode = meetingCode.trim();
        if (!cleanCode) return;

        const isValidFormat = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/.test(cleanCode);
        if (!isValidFormat) {
            setError('Code must be in xxxx-xxxx-xxxx format');
            return;
        }

        if (user) {
            navigate(`/meeting/${cleanCode}`);
        } else {
            localStorage.setItem('pendingMeetingCode', cleanCode);
            setShowSignIn(true);
            setDialogOpen(true);
        }
    }, [user, meetingCode, navigate]);

    /**
     * Recovery handler executed post-authentication.
     * Resolves any cached state (pending joins or creations) mapped prior to login.
     */
    const handleAuthSuccess = useCallback(async () => {
        setDialogOpen(false);
        setShowSignIn(false);

        const currentUser = auth.currentUser;

        if (isJoinMeeting) {
            const pendingCode = localStorage.getItem('pendingMeetingCode');
            localStorage.removeItem('pendingMeetingCode');
            
            if (pendingCode) {
                navigate(`/meeting/${pendingCode}`);
            }
        } else {
            if (currentUser) {
                try {
                    const res = await fetch(`${API}/api/meetings`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ hostId: currentUser.uid, title: 'Quick Meeting' }),
                    });
                    const { meeting } = await res.json();
                    navigate(`/meeting/${meeting.roomId}`);
                } catch (e) {
                    console.error('[MEETING_CREATE_POST_AUTH]', e);
                    navigate('/dashboard');
                }
            } else {
                navigate('/dashboard');
            }
        }
    }, [isJoinMeeting, navigate]);

    return {
        dialogOpen,
        setDialogOpen,
        isJoinMeeting,
        setIsJoinMeeting,
        showSignIn,
        setShowSignIn,
        meetingCode,
        setMeetingCode,
        error,
        setError,
        showJoinDialog,
        setShowJoinDialog,
        user,

        startNewMeeting,
        joinMeeting,
        handleManualJoin,
        handleAuthSuccess
    };
}

