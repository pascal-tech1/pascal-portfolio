// ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
	".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(
	".header__sm-menu-link"
);

hamMenuBtn.addEventListener("click", () => {
	if (smallMenu.classList.contains("header__sm-menu--active")) {
		smallMenu.classList.remove("header__sm-menu--active");
	} else {
		smallMenu.classList.add("header__sm-menu--active");
	}
	if (headerHamMenuBtn.classList.contains("d-none")) {
		headerHamMenuBtn.classList.remove("d-none");
		headerHamMenuCloseBtn.classList.add("d-none");
	} else {
		headerHamMenuBtn.classList.add("d-none");
		headerHamMenuCloseBtn.classList.remove("d-none");
	}
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
	headerSmallMenuLinks[i].addEventListener("click", () => {
		smallMenu.classList.remove("header__sm-menu--active");
		headerHamMenuBtn.classList.remove("d-none");
		headerHamMenuCloseBtn.classList.add("d-none");
	});
}

// ---
const headerLogoConatiner = document.querySelector(
	".header__logo-container"
);

headerLogoConatiner.addEventListener("click", () => {
	location.href = "index.html";
});

async function sendPascalMsg(sendingData) {
	try {
		const resp = await fetch(
			"https://blogvana-backend.onrender.com/api/message/contact-me",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Set the content type to JSON
				},
				body: JSON.stringify({ sendingData, from: "portfolio" }), // Convert data to JSON string
			}
		);

		if (!resp.ok) {
			throw new Error(`HTTP error: ${resp.status}`);
		}

		const data = await resp.json();
		return data;
	} catch (error) {
		throw error;
	}
}

function handleSubmit(event) {
	event.preventDefault();

	const formData = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		message: document.getElementById("message").value,
	};

	const formElement = document.querySelector(".contact__form");
	const existingMessageElement = formElement.querySelector(".message");

	// Remove existing message if it exists
	if (existingMessageElement) {
		formElement.removeChild(existingMessageElement);
	}

	const messageElement = document.createElement("h3");
	messageElement.classList.add("message"); // Add a class to identify the message element

	sendPascalMsg(formData)
		.then((data) => {
			// Handle success
			messageElement.textContent = "Message sent successfully";
			formElement.appendChild(messageElement);
		})
		.catch((error) => {
			// Handle error
			messageElement.textContent = "Failed to send message";
			formElement.appendChild(messageElement);
		});
}
