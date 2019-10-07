import React from "react";

function Welcome(props) {
	return (
		<div>
			<h1>
				Welcome to Pusuit Core -{" "}
				<script> document.write((new Date()).getFullYear())</script> JavaScript
				Workshop
			</h1>

			<h2>What is this thing?</h2>
			<p>
				Welcome to the Pursuit Core{" "}
				<script> document.write((new Date()).getFullYear())</script> JavaScript
				workshop! In this workshop we'll be teaching you the basics of
				JavaScript and some of the fundamentals of programming. During this
				class you'll learn about expressions, variables, Arrays, Loops,
				Conditionals, and Functions, and use these concepts to write your own
				programs!
			</p>

			<h2>Game Plan</h2>
			<p>
				This workshop also serves as part of the Pursuit application process.
				After this workshop, you'll be given an assessment containing questions
				about reading and writing JavaScript. The assessment will test your
				understanding of what you will learn during the workshop, as well as
				your ability and initiative to teach yourself new concepts in a short
				period of time. We'll look at the assessment as part of your
				application.
			</p>

			<h2>Environment</h2>
			<p>
				We will all be using the{" "}
				<a href="https://www.google.com/chrome/browser/desktop/index.html">
					Google Chrome browser
				</a>
				. Make sure you are on the latest version.
			</p>
			<p>
				We will be using{" "}
				<a href="https://repl.it/languages/javascript_web">repl.it</a> to write
				and run small JavaScript programs. Make sure to select the{" "}
				<b>"JavaScript Web"</b> language if you land on the homepage, or go
				straight to{" "}
				<a href="https://repl.it/languages/javascript_web">
					repl.it/languages/javascript_web
				</a>
				.
			</p>

			<h2>Resources</h2>
			<p>
				Some incredibly good JavaScript resources are available at{" "}
				<a href="http://www.w3schools.com">w3schools</a>; Specifically the{" "}
				<a href="http://www.w3schools.com/js">JavaScript Tutorial</a> for
				explanations about the language and the{" "}
				<a href="http://www.w3schools.com/jsref">JavaScript Reference</a> for a
				comprehensive guide to the fundamental tools, libraries, and built-in
				objects and types of the language.
			</p>

			<h2>Partnering up</h2>
			<p>
				Many of the exercises in this workshop will ask you to partner up with
				your neighbor. What does that mean?
			</p>
			<p>
				You should be talking out your thought process with your partner before
				you write any code. If there's a disagreement, try to identify the
				fundamentals that you disagree on, and try and use the workshop content
				and reference resources to find out the truth about the fundamentals. If
				you're still having disagreements, feel free to raise your hand and a TA
				or instructor can help you resolve it.
			</p>
			<p>
				When coding, usually you should have one person code while the other
				person "drives" by instructing the coder what to type. When you're done,
				the driver then copies the code back to their computer so they can have
				a copy of it for future reference. Make sure you switch off "driver" and
				"coder" as often as possible!
			</p>
			<p>
				In addition, we will be asking you to switch neighbors at least once
				throughout the workshop so you can meet lots of your peers! We are
				interested in evaluating your teamwork skills with lots of different
				students, so be polite and courteous but push each other to learn and
				write great code!
			</p>
		</div>
	);
}

export default Welcome;
