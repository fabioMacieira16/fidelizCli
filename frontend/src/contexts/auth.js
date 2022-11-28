import { useState, createContext, useEffect } from "react";
import firebase from '../service/firebaseConnection'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setloadingAuth] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setloading(false)
            }
            setloading(false)
        }
        loadStorage();

    }, [])

    //Logar usuario
    async function SignIn(email, password) {
        setloadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avataUrl: userProfile.data().avataUrl,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setloadingAuth(false);
                toast("Bem vindo!")

            }).catch((error) => {
                toast("Usuário ou senha invalidos")
                setloadingAuth(false);
            })
    }

    //register new user
    async function signUp(emai, password, nome) {
        setloadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(emai, password)
            .then(async (value) => {
                // let uid = value.uid;
                let uid = value.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avataUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            emai: value.user.email,
                            avataUrl: null
                        };

                        setUser(data);
                        storageUser(data);
                        setloadingAuth(false);
                    })
            }).catch((error) => {
                setloadingAuth(false);
                toast("error ao cadastrar o usuário")
                console.log("#errror", error);
            })
    }

    // deslogar o usuario
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            SignIn,
            loadingAuth,
            setUser,
            storageUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
