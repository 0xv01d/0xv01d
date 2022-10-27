document.addEventListener("keyup", e=>{

	if (e.target.matches("#search")){
		if(e.key == "Escape")e.target.value = ""

		document.querySelectorAll(".card").forEach(card =>{
			card.textContent.toLowerCase().includes(e.target.value.toLowerCase())
			?card.classList.remove("filter")
			:card.classList.add("filter")
		})
	}

})
