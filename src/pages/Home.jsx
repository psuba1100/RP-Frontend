import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="block elements-top vertical">
      <footer className="text-center"><p className="item"><em>Scroll down to learn about website and Privacy Policy.</em></p></footer>
      <div className="container vertical">
        <div className="block stretch horizontal-priority mt-4 item">
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

      <div className="block horizontal-priority mt-4 stretch hp-elements-top">
        <h2 className="m">About privacy policy</h2>
        <div className="block vertical item  text-center">
          <p> This website uses strictly necessary cookies solely for user authentication and authorization. These cookies are required for the service to function and cannot be disabled. We do not use analytical, tracking, or marketing cookies. </p>
          <p> All data transmitted between your device and our servers are encrypted using TLS/HTTPS. All server requests are routed through <Link className="link">Cloudflare</Link>, a third-party service provider that helps secure and deliver our content. </p>
          <p> Any image you upload to the server may be publicly accessible to other users or services on the internet. Do not upload any sensitive or confidential information. All text content you create on flashcards may be visible to other users of Winkify. Do not include sensitive or personal information. </p>
          <p> We do not collect or store personal data such as email addresses, physical addresses, dates of birth, or similar identifiers. The only identifier associated with your account is your username. We strongly recommend that you do not use your real name as your username. </p>
          <p> You may delete your account at any time in the <strong>Study Hub</strong> section. Account deletion permanently removes all associated data from our systems, including lockers, subjects, to-do tasks, and flashcard sets. Images previously uploaded may remain accessible for up to 24 hours after account deletion due to technical limitations. </p>
          <p> If you use this website between <strong>8 January 2026, 00:00 CET</strong> and <strong>15 March 2026, 23:59 CET</strong>, you automatically participate in the service testing phase. During this period, we collect additional usage analytics listed at the end of this Privacy Policy. These data are used exclusively for the final evaluation of this project. </p>
          <p> The collected analytical data are stored on our servers and are not shared with third parties. Access is restricted to the project owner only. Aggregated or anonymized data may be used in project presentations or documentation, but they will never be linked to your username or account ID. </p>
          <p> Participation in the testing phase cannot be opted out of while using the service. However, deleting your account will permanently remove all statistics associated with it. After the testing phase ends, you may request access to your personal statistics by authenticating as the account owner (username and password). </p>
          <p> <strong>List of data collected during the testing phase:</strong><br /> – Number of times you loaded a flashcard set you own<br /> – Number of times you loaded a flashcard set owned by another user<br /> – Number of flashcard sets you created<br /> – Number of images uploaded to the server<br /> – Number of locker updates<br /> – Number of subjects created<br /> – Number of to-do tasks created<br /> – Number of to-do tasks completed (deleted)<br /> – Number of flashcard sets saved from other users to your library<br /> – Number of password updates </p>
        </div>
      </div>
    </main>
  )
}
