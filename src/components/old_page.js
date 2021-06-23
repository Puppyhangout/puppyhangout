import { Button } from "@material-ui/core"
import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { login_store } from "./login/login_store"

export const OldPage = observer(() => {
    return <>
        <div class="header">
            <h1>Puppy Hangout</h1>
            <p>Do you feel guilty to leave your dog at home alone? Do you want to hang out with a dog in your neighbourhood? Puppymatch provides a platform that connects dog walkers and dog owners based on distance.
            </p>
        </div>




        <div class="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            <div class="Column1" style={{ "background-color": "lavenderblush" }}>
                <p>You are a dog walker! click here to register as a dog owner</p>



                <Button color='primary' variant='contained'
                    onClick={action(() => login_store.show_page = true)}>Login</Button>





                <Button color='primary' variant='contained'
                    onClick={action(() => login_store.show_page = true)}>Signup</Button>

                <p><br />Maximum distance</p>
                <form action="http://www.cs.mcgill.ca/~zshi11/cgi-bin/answer.cgi" method="get">
                    <input type="text" name="name" />
                    <input type="submit" value="Submit" />
                </form>
                <p><br></br>Messages</p>
                <p class="one">?</p>
                <p class="one">You sent LuckyTheLab a like</p>
                <p class="one">You sent chiyaya a like</p>


            </div>
            <div class="Column2" style={{ "background-color": "ivory" }}>
                <div class="container">
                    <img src="https://www.segerios.com/wp-content/uploads/2016/08/Innocent-Black-Labrador-Retriever-Dog-Image.jpg" alt="dog1" height="450" width="400" />

                    <div class="bottom-left">
                        <p>Luna</p>
                        <p>2km</p>
                        <p>Does anyone want to keep my dog this weekend? </p>
                    </div>
                </div>
                <i class="fas fa-angle-left"
                    style={{ position: 'relative', float: 'left', width: '8em', overflow: 'hidden', fontSize: '20px', color: '#2196F3' }}
                ></i>
                <i class="fas fa-heart"
                    style={{ position: 'relative', float: 'left', width: '8em', overflow: 'hidden', fontSize: '20px', color: '#2196F3' }}></i>
            </div>
        </div>

        <div class="footer">
            <p>Copyright Olivia website, Inc. All Rights Researved.</p>
            <ul>
                <li><a href="default.asp">Home</a></li>
                <li><a href="news.asp">My Account</a></li>
                <li><a href="contact.asp">Contact</a></li>
                <li><a href="about.asp">About</a></li>
            </ul>
        </div>
    </>
})