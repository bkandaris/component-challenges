import { useState, useEffect } from 'react';
import axios from 'axios';
import pinsvg from './assets/pinIcon.svg'
import msgsvg from './assets/messageIcon.svg';
import terminalIcon from './assets/terminalIcon.svg'
import { motion } from 'framer-motion';

const Profile = () => {
	const [person, setPerson ] = useState(null)
	const [friends, setFriends ] = useState(null)
	const [buttonOn, setButtonOn] = useState(true)

	const addFriend = () => {
		setFriends(friends+1)
		setButtonOn(!buttonOn)
	}

	const deleteFriend = () => {
		setFriends(friends-1)
		setButtonOn(!buttonOn)
	}

	useEffect(()=> {
		axios.get("https://api.github.com/users/bkandaris")
		.then((res) => {
			setPerson(res.data)
			setFriends(res.data.followers)
			console.log('data', res)
		})
		.catch(err => {console.log(err)})
	}, [])
	if(!person) {
		return <p>loading...</p>
	}
	
	return(
	<motion.div     animate={{
		scale: [1, 2, 2, 1, 1],
		rotate: [0, 0, 270, 270, 0],
	  }}  className="mainDiv"> 
		<div className="headerDiv" >
			<img className="profileImage" src={person.avatar_url}/>
			<p className="name">{person.name}</p>
			<p className="location"><img className="locationsvg" src={pinsvg} alt={"pin location"}  />{person.location}</p>
		</div>
		<div className="friendsDiv" >
			<div className="friendsMiniDiv" >
				<h3>Friends</h3>
				<p className="friendsNumbers">{friends}</p>
			</div>
			<div className="friendsMiniDiv">
				<h3>Repos</h3>
				<p className="friendsNumbers">{person.public_repos}</p>
			</div>
			<div className="friendsMiniDiv">
				<h3>Bugs</h3>
				<p className="friendsNumbers">{person.following}</p>
			</div>
		</div>
		<div className="buttonWrapper" >
		{ buttonOn ?
			<button className="upButton codeTogether" onClick={()=> {addFriend()}}>
				<img className="buttonImg" src={terminalIcon} alt="terminal icon" />
				Code Together
			</button>
				:
			<button className="downButton codeTogether"onClick={()=> {deleteFriend()}}>
				<img className="buttonImg" src={terminalIcon} alt="terminal icon" />
				Code Together
			</button>
			}

			{ buttonOn ?
			<div className="msgWrapper">
				<img  src={msgsvg} alt="message icon"/>
			</div>
			: 
			<div className="newFriends">
			<h4>Friends</h4>
			<p className="friendsNum">{friends}</p>
			</div>
				}
		</div>
	 </motion.div>
	 );
};

export default Profile;
