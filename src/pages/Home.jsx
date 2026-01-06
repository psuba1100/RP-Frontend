import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="container elements-top vertical">
      <div className="block stretch horizontal-priority mt-4">
        <div className="block vertical item m g-05">
          <h1 className="m0">Reviewing is as simple as winking an eye</h1>
          <em><h3 className="m0">If you have the right tools...</h3></em>
          <Link className="link">winkify.review</Link>
        </div>
        <div className="item block g-2 m">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>

      <div className="block horizontal-priority mt-4 stretch hp-elements-top">
        <h2 className="m">About website</h2>
        <p className="m item text-center">Winkify.review is a lightweight website designed to make student life easier. It lets you create to-do tasks and flashcard sets with rich text formatting, images, and math formulas, which you can easily share with friends. Your classmates can also share their own sets with you, and you can add them to your library in one click. The website also includes a digital locker, so you never have to wonder whether you left your books or notes at home or at school. The entire website is completely free to use. A video tutorial showing the main features can be found <Link className="link">here</Link>.</p>
      </div>

      <div className="block horizontal-priority mt-4 stretch hp-elements-top">
        <h2 className="m">About project</h2>
        <p className="m item text-center">This website was created as part of a school project called <em>Ročníková práca</em>. <em>Ročníková práca</em> is a year-long assignment focused on research and learning the basics of academic writing while documenting the process. The goal of my project is to create a secure, simple, and user-friendly website that helps students with studying and later with collaboration in groups. A key part of the project is choosing modern and reliable tools, working with the global internet, and involving students themselves while collecting useful analytical data that can help improve the project in the future.</p>
      </div>

      <div className="block horizontal-priority mt-4 stretch hp-elements-top">
        <h2 className="m">About technical details</h2>
        <div className="block vertical item  text-center">
          <p>The website consists of two main parts: the backend and the frontend. The backend is further divided into a server and a database. The server is written in JavaScript, runs on Node.js, and uses the Express.js framework. It is self-hosted on a computer running a Debian-based Linux distribution. The server handles incoming requests, validates data, communicates with the database, and sends responses back to the client. The project uses a JSON-based MongoDB database, which is also self-hosted.</p>
          <p>The frontend is built using React and Vite. It is the part of the website you see when you load the page. It provides a clean and intuitive user interface that allows users to access, edit, and share their data stored on the server. A complete list of used dependencies and the source code can be found on my <Link className="link">GitHub</Link>.</p>
        </div>
      </div>
    </main>
  )
}
