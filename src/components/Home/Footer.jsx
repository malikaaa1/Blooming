import React,{useState} from 'react';
import {useAuth} from "../../context/AuthContext"
import fire from "../../fire";
import firebase from "firebase/app";

import { makeStyles } from "@material-ui/core";

const Footer = () => {

const firestore = fire.firestore();

  const { handleLogout, user } = useAuth();
 

  // for emails
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (input) {
      console.log(input);
      // add to firebase
      firestore.collection("emails").add({
        email: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
      setMessage("Thank you for Subscribing!!!");
      setTimeout(() => {
        setMessage("");
      },6000);
    }
  };
	return (
		<div>
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Blooming</h3>

				<p class="footer-company-name">Blooming © 2021</p>

			</div>

			<div class="footer-right">

			<form action="" onSubmit={submitHandler}>
                    <div className="collumn justify-content-center">
                      <div className="col-auto">
                        <p >
                          <span className="subscribeSpan">If you want new updates, then subscribe</span>
                        </p>
                      </div>

                      <div className="col-md-5 col-12">
                        <div className="form-outline form-white mb-4">
                          <input
                            type="email"
                            id="form5Example2"
                            className="form-control"
                            onChange={inputHandler}
							placeholder="Your email..."
                            value={input}
                          />
                        </div>
                      </div>

                      <div className="col-auto">
                        <button
                          type="submit"
                          className="subscribe"
                        >
                          Subscribe
                        </button>
                      </div>
                      {message && (
                        <span className="emailMessage">{message}</span>
                      )}
                    </div>
                  </form>
			</div>

		</footer>
		</div>
	);
};

export default Footer;