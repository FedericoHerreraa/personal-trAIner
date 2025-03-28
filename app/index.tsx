import { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase';
import { View } from 'react-native';

export default function Index() {
    const [session, setSession] = useState<Session | null>(null)
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        // <View>
        //     {session && session.user ? <Redirect href="/home" /> : <Redirect href="/account" /> }
        // </View>
        <Redirect href="/home" />
    )
}