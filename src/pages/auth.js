import React, { useState } from "react";
import { Roboto } from "next/font/google";
import styles from "@/styles/Auth.module.scss";
import Head from "next/head";

import firebaseConfig from "@/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function Auth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Giriş başarılı
        const user = userCredential.user;
        setLoggedIn(true);
        console.log(user);
        alert(`Hoş geldiniz, ${user.displayName}.`)
      })
      .catch((error) => {
        // Giriş başarısız
        const errorCode = error.code;
        const errorMessage = error.message;

        setError({ error: true, errorMessage: errorMessage });
      });
  }

  function handleSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Hesap başarıyla oluşturuldu
        const user = userCredential.user;

        updateProfile(user, {
          displayName: displayName,
        });
      })
      .catch((error) => {
        // Hesap oluşturma başarısız
        const errorCode = error.code;
        const errorMessage = error.message;

        setError({ error: true, errorMessage: errorMessage });
      });
  }

  return (
    <>
      <Head>
        <title>
          {isUserRegistered ? "Login - DevSocial" : "Register - DevSocial"}
        </title>
      </Head>
      <main>
        <div className={`${styles.popup} ${roboto.className}`}>
          {isUserRegistered ? (
            <div className="login">
              <h1>Login</h1>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </form>
              <button
                className={styles.button}
                onClick={() => {
                  setIsUserRegistered(false);
                }}
              >
                Don&apos;t have account? Register
              </button>
            </div>
          ) : (
            <div className="register">
              <h1>Register</h1>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Username"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className={styles.button}>
                  Register
                </button>
              </form>
              <button
                className={styles.button}
                onClick={() => {
                  setIsUserRegistered(true);
                }}
              >
                Already registered? Sign-In
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
