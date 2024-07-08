  var tocContainer = document.querySelector(".post-toc");
	console.log("TOC Container: ",tocContainer);

  // Seleccionar todos los encabezados h1, h2, h3, etc.
  var headings = document.querySelectorAll("h1.toc-add, h2.toc-add, h3.toc-add, h4.toc-add, h5.toc-add, h6.toc-add");
	console.log("Elementos h recolectados: ",headings);

  // Variables para el seguimiento de niveles
  let nivelAnterior = 1;
	console.log("Nivel inicial: ",nivelAnterior);

  let ultimoElementoLista = tocContainer;
	console.log("Ultimo elemento en la lista: ",ultimoElementoLista);

	console.log("Comenzamos a iterar...");


	  // Iterar sobre los encabezados para construir la tabla de contenido
  	headings.forEach((heading) => {
    // Obtener el nivel del encabezado (h1, h2, etc.)
    const nivel = parseInt(heading.tagName.charAt(1));
     
    console.log("Nivel anterior: ", nivelAnterior, " Nivel actual: ", nivel);
		
      
    
    // Comparar niveles y ajustar la estructura de la lista
    if (nivel > nivelAnterior) {
      console.log("Se esta creando una anidacion...");
      
      const nuevoOl = document.createElement("ol");
      nuevoOl.classList.add("post-toc-child", "post-toc-expand");
      
      console.log("Elmento creado: ",nuevoOl);
      
      ultimoElementoLista.appendChild(nuevoOl);
      console.log("Ultimo elemento en la lista: ",ultimoElementoLista);
      ultimoElementoLista = nuevoOl;
      console.log("Ultimo elemento en la lista2: ",ultimoElementoLista);
    } else if (nivel < nivelAnterior) {
      console.log("Saliendo de la anidacion...");
      for (let i = nivel; i < nivelAnterior; i++) {
        ultimoElementoLista = ultimoElementoLista.parentElement; // Retroceder dos niveles para salir de la lista anidada
        console.log("Ultimo elemento en la lista: ", ultimoElementoLista);
      }
    }
      
      // Crear el elemento li para la tabla de contenido
    	const tocItem = document.createElement("li");
    	tocItem.classList.add("post-toc-item", `post-toc-level-${nivel}`);
      
      console.log("Elemento li creado: ",tocItem);
      
      // Crear el enlace para el elemento de la tabla de contenido
    	const tocLink = document.createElement("a");
    	tocLink.classList.add("post-toc-link");
    	tocLink.href = `#${heading.id}`;
    	tocLink.innerHTML = `<span class="post-toc-number">${nivel}.</span> <span class="post-toc-text">${heading.textContent}</span>`;
      
      console.log("Elemento a para li: ", tocLink);
      
			// Agregar el enlace al elemento li
    	tocItem.appendChild(tocLink);

      console.log("Elemento final: ",tocItem);
      
    	// Agregar el elemento li al contenedor de la tabla de contenido
    	ultimoElementoLista.appendChild(tocItem);
      console.log("Elemento FINAL: ",ultimoElementoLista);

    	// Actualizar el nivel anterior
    	nivelAnterior = nivel;
      console.log("Nivel actualizado: ", nivel);
      
      });
