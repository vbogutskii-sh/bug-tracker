import React, { useState, useEffect } from "react";
import "./profile.css";
import { updateProfile } from "firebase/auth";
import { storage } from "../../dbConnection";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {UserAuth} from '../Auth/AuthContext'

const UserProfile = () => {
  const { user } = UserAuth();
  const [photoURL, setPhotoURL] = useState( "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-4j0Oe5cma88GR-7QnLGS1IHpvKZiKuWy8g&usqp=CAU");
  const [userFirstName, setUserFirstName] = useState("Vasiya");
  const [userLastName, setUserLastName] = useState("Pupkin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("*******");

  const uploadPhoto = (file, user) => {
    const fileRef = ref(storage, user.uid);
    uploadBytes(fileRef, file).then((snaphot) => {
      getDownloadURL(snaphot.ref).then(url => {
        updateProfile(user, { photoURL: url })
          .then(() => {
            alert("New Photo is uploaded");
          })
          .catch((err) => {
            alert("Wrong photo's format!");
          });
      })
    });
  };
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      await uploadPhoto(file, user);
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      console.log(user.photoURL);
      setPhotoURL(user.photoURL)
    }
      if (user?.email) {
        setEmail(user.email);
      }
      if (user?.displayName) {
        setEmail(user.displayName);
        console.log(user.displayName);
      }
  }, [user]);

  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <div className="text-center">
                <img src={photoURL}
                     className="rounded-circle"
                     alt="avatar"/>
                <h6>Upload a different photo...</h6>
                <div className="d-flex justify-content-around">
                <div className="btn btn-secondary btn-rounded btn-sm">
                  <label className="form-label text-white m-0"
                         htmlFor="customFile">Choose file</label>
                  <input type="file"
                         className="form-control d-none" id="customFile"
                         onChange={handleChange} />
                </div>
                  <div>
                  <input
                    type="submit"
                    className="btn btn-outline-secondary btn-rounded btn-sm"
                    name="btnAddMore"
                    value="Upload"
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{userFirstName + " " + userLastName}</h5>
              <p className="profile-rating">
                <span>admin</span>
              </p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Permissions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input
              type="submit"
              className="profile-edit-btn btn-danger"
              name="btnAddMore"
              value="Save"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-6 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value={userFirstName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-6 col-form-label"
                  >
                    Last Name
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value={userLastName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-6 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value={email}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-6 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      value="*******"
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              ></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
