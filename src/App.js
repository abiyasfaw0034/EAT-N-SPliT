import { useState } from "react";

var initialfriends = [
  {
    name: "Clark",
    image: "https://picsum.photos/200",
    balance: -50,
    id: crypto.randomUUID(),
  },
  {
    name: "Anthony",
    image: "https://picsum.photos/200",
    balance: 20,
    id: crypto.randomUUID(),
  },
];
export default function App() {
  return (
    <>
      <Video />
      <Container />
    </>
  );
}
function Button({ children, classname, onclick }) {
  return (
    <button className={classname} onClick={onclick}>
      {children}
    </button>
  );
}
function Container() {
  const [showaddfriend, setshowaddfriend] = useState(false);
  const [friends, setfriends] = useState(initialfriends);
  const [selectedfriend, setselectedfriend] = useState(null);

  function handleshowAddfriend() {
    setshowaddfriend(() => !showaddfriend);
  }
  function handleAddfriend(friend) {
    setfriends((friends) => [...friends, friend]);
    setshowaddfriend(false);
  }
  function handleSelectedFriend(friend) {
    setselectedfriend(friend);
  }
  function handleSplitBill(value) {
    console.log(value);

    setfriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedfriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  return (
    <div className="whole">
      <Logo />
      <div className="holder">
        <div className="sidebar">
          <FriendList
            friends={friends}
            handleSelectedFriend={handleSelectedFriend}
            selectedfriend={selectedfriend}
          />
          {showaddfriend && <AddFreind onaddfriend={handleAddfriend} />}

          <Button classname={"addbutton"} onclick={handleshowAddfriend}>
            {showaddfriend ? "Close" : "Add Friend"}
          </Button>
        </div>

        <div className="splitbill">
          {selectedfriend && (
            <SplitBill
              onSelect={selectedfriend}
              handleSplitBill={handleSplitBill}
            />
          )}
        </div>
      </div>
    </div>
  );
}
function AddFreind({ onaddfriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("");

  function handleAddfriend(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newfriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    onaddfriend(newfriend);
    setimage("");
    setname("");
  }
  return (
    <div className="addfriend">
      <form onSubmit={handleAddfriend}>
        <div className="input-group">
          <h4>Friend's name:</h4>
          <input
            type="text"
            value={name}
            placeholder="Friend's name"
            className="add"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="input-group">
          <h4>📷Image URL:</h4>
          <input
            type="text"
            value={image}
            placeholder="https://picsum.photos/200"
            className="add"
            onChange={(e) => setimage(e.target.value)}
          />
        </div>
        <div className="adddiv">
          <Button classname={"addbutton"}>Add</Button>
        </div>
      </form>
    </div>
  );
}
function FriendList({ friends, handleSelectedFriend, selectedfriend }) {
  return (
    <ul className="friends">
      {friends.map((friend) => (
        <Friends
          friends={friend}
          handleSelectedFriend={handleSelectedFriend}
          selectedfriend={selectedfriend}
        />
      ))}
    </ul>
  );
}
function Friends({ friends, handleSelectedFriend, selectedfriend }) {
  const selected =
    selectedfriend && selectedfriend.id === friends.id ? "selected" : "";
  return (
    <li className={`friend ${selected}`} key={friends.id}>
      <img src={friends.image} alt="pic" />
      <div className="list">
        <h3>{friends.name}</h3>
        <p>
          {friends.balance < 0 &&
            `${friends.name} owes you ${friends.balance}$`}
          {friends.balance > 0 && `you owe ${friends.name} ${friends.balance}$`}
          {friends.balance === 0 && `you and ${friends.name} are even`}
        </p>
      </div>
      <button className="button" onClick={() => handleSelectedFriend(friends)}>
        Select
      </button>
    </li>
  );
}

function SplitBill({ onSelect, handleSplitBill }) {
  const [bill, setbill] = useState(0);
  const [yourexpense, setyourexpense] = useState(0);
  const [whopaid, setwhopaid] = useState("you");

  function onSplitBill(e) {
    e.preventDefault();

    if (!bill || !yourexpense) return;

    const friendShare = whopaid === "you" ? bill - yourexpense : yourexpense;

    // Call the parent component function to handle the split bill
    handleSplitBill(friendShare);
    // setbill(0);
    // setwhopaid("you");
    // setyourexpense(0);
  }
  return (
    <div className="splitholder">
      <div className="containersplit">Split a bill with {onSelect.name}</div>
      <div>
        <form onSubmit={onSplitBill}>
          <div className="input-group">
            <h4>💸Bill value:</h4>
            <input
              type="text"
              value={bill}
              className="a"
              onChange={(e) => setbill(Number(e.target.value))}
            />
          </div>
          <div className="input-group">
            <h4>💸Your expense:</h4>
            <input
              type="text"
              className="a"
              value={yourexpense}
              onChange={(e) => setyourexpense(Number(e.target.value))}
            />
          </div>
          <div className="input-group">
            <h4>💸{onSelect.name}'s expense:</h4>
            <input
              type="text"
              disabled
              className="a"
              value={bill - yourexpense}
            />
          </div>
          <div className="input-group">
            <h4>💸Who is paying:</h4>
            <select className="a" onChange={(e) => setwhopaid(e.target.value)}>
              <option value={whopaid}>you</option>
              <option value="Clark">Clark</option>
            </select>
          </div>
          <Button classname={"splitbutton"}>Split 💸Bill</Button>
        </form>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <div className="content">🍔 Eat-N-Split 🍕</div>
    </div>
  );
}

function Video() {
  return (
    <video autoPlay muted loop>
      <source
        src="https://thumbs.dreamstime.com/videothumb_large18347/183477624.webm"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}
