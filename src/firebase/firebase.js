import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyBr5-TR1jdUHXuFj2ddbd6PY-F9FQf7Y_A",
	authDomain: "simple-task-manager-7fd71.firebaseapp.com",
	databaseURL: "https://simple-task-manager-7fd71.firebaseio.com",
	projectId: "simple-task-manager-7fd71",
	storageBucket: "simple-task-manager-7fd71.appspot.com",
	messagingSenderId: "855914287204",
	appId: "1:855914287204:web:04a4d61967c8cfd960cf71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
  })

export { firebase, database, provider };