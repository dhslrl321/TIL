


const App = () => {
  const [state ,setState] = useState({
    user: {
      username: "",
      email: ""
    }
  });

  const printInfo = () => {
    const { username, email } = state;
    console.log(username, email);
  }
}




const App = () => {
  const [state, setState] = useState({
    user: new User("", "")
  })

  const handleXXX = () => {

  }
}

class User {
  username;
  email;

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  change(username, email) {
    this.username = username;
    this.email = email;
    return new User(username, email);
  }

  
}