

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el contenedor de la tabla de contenido
  const tocContainer = document.querySelector(".post-toc");

  // Seleccionar todos los encabezados h1, h2, h3, etc.
  const headings = document.querySelectorAll("h1.toc-add, h2.toc-add, h3.toc-add, h4.toc-add, h5.toc-add, h6.toc-add");

  // Variables para el seguimiento de niveles
  let nivelAnterior = 1;
  let rootTocTag = tocContainer;
  let ultimoElementoLista = tocContainer;
  let contador = Array.from({ length: 6 }, () => 0); // Contador para cada nivel, inicializado en 0

  // Iterar sobre los encabezados para construir la tabla de contenido
  headings.forEach((heading) => {
    // Obtener el nivel del encabezado (h1, h2, etc.)
    const nivel = parseInt(heading.tagName.charAt(1));

    // Comparar niveles y ajustar la estructura de la lista
    if (nivel > nivelAnterior) {
      const nuevoOl = document.createElement("ol");
      nuevoOl.classList.add("post-toc-child", "post-toc-shrink");
      ultimoElementoLista.appendChild(nuevoOl);
      ultimoElementoLista = nuevoOl;
    } else if (nivel < nivelAnterior) {
      for (let i = nivel; i < nivelAnterior; i++) {
        ultimoElementoLista = ultimoElementoLista.parentElement; // Retroceder dos niveles para salir de la lista anidada
      }
    }

    // Incrementar el contador del nivel actual y restablecer contadores de niveles superiores
    contador[nivel - 1]++;
    for (let i = nivel; i < contador.length; i++) {
      contador[i] = 0;
    }

    // Crear el elemento li para la tabla de contenido
    const tocItem = document.createElement("li");
    tocItem.classList.add("post-toc-item", `post-toc-level-${nivel}`);

    // Crear el enlace para el elemento de la tabla de contenido
    const tocLink = document.createElement("a");
    tocLink.classList.add("post-toc-link");
    tocLink.href = `#${heading.id}`;

    // Construir la numeración con el formato correcto
    let numeracion = contador.slice(0, nivel).join(".");

    tocLink.innerHTML = `<span class="post-toc-number">${numeracion}</span> <span class="post-toc-text">${heading.textContent}</span>`;

    // Agregar el enlace al elemento li
    tocItem.appendChild(tocLink);

    if (nivel === 1) {
      ultimoElementoLista = rootTocTag;
      ultimoElementoLista.appendChild(tocItem);
      ultimoElementoLista = tocItem;
    } else {
      // Agregar el elemento li al contenedor de la tabla de contenido
      ultimoElementoLista.appendChild(tocItem);
    }

    // Actualizar el nivel anterior
    nivelAnterior = nivel;

    var child_active = false;

    // Verificar la visibilidad del encabezado en la página
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //Obtener etiquetas 'ol' hijas
            var children = tocItem.children;
            console.log("INTERSECTING\nItem: ",tocItem, "Parent Item: ", tocItem.parentElement, "Item Children: ",children);
/*            console.log("Toc item: ", tocItem, " Toc item parent: ", tocItem.parentElement, "Toc item parent classlist: ", tocItem.parentElement.classList," Children tags: ", children);
*/
            var tocItemParentClassList = tocItem.parentElement.classList;
            var tocItemParent = tocItem.parentElement;

            if (tocItemParentClassList.contains('post-toc-child')){
              tocItemParent.classList.remove('post-toc-shrink')
              tocItemParent.classList.add('post-toc-expand')
            }

            console.log("Filtrando tags 'ol' en children...")
            // Convertir la colección a un array para facilitar su manipulación
            var listaOlHijos = Array.from(children).filter(function(child) {
              return child.tagName.toLowerCase() === 'ol';
            });
            listaOlHijos.forEach(function(elementoOl) {
              console.log("Hijos de ol: ", elementoOl, " Hijos: ", elementoOl.children);
              elementoOl.classList.remove('post-toc-shrink');
              elementoOl.classList.add('post-toc-expand');
            });
            // Agregar la clase "active" al elemento li si es visible
            tocItem.classList.add("active");
          }/* else {
            //Obtener etiquetas 'ol' hijas
            var children = tocItem.children;
            console.log("NO INTERSECTING\nItem: ",tocItem, "Parent Item: ", tocItem.parentElement, "Item Children: ",children);
            // Convertir la colección a un array para facilitar su manipulación
            var listaOlHijos = Array.from(children).filter(function(child) {
              return child.tagName.toLowerCase() === 'ol';
            });
            

            listaOlHijos.forEach(function(elementoOl) {
              var olChildren = elementoOl.children;
/*              var listaLiChildren = Array.from(olChildren).filter(function(child) {
                return child.tagName.toLowerCase() === 'li';
              });
              console.log('Elementos li: ',listaLiChildren);

              listaLiChildren.forEach(function(elementoli) {
                var liClassList = elementoli.classList;
                console.log('\nElemento li: ', elementoli, "\nElemento li class: ",liClassList);
                if (liClassList.contains('active')){
                  elementoli.parentElement.classList.remove('post-toc-shrink');
                  elementoli.parentElement.classList.add('post-toc-expand');
                }else{
                  elementoli.parentElement.classList.remove('post-toc-expand');
                  elementoli.parentElement.classList.add('post-toc-shrink');
                }

              });
              

              elementoOl.classList.remove('post-toc-expand');
              elementoOl.classList.add('post-toc-shrink');
            });
            // Quitar la clase "active" si no es visible
            tocItem.classList.remove("active");
          }*/
        });

      },
      { threshold: 0.5 } // Puedes ajustar el umbral según tus necesidades
    );

    // Observar el encabezado actual
    observer.observe(heading);

  });
});

/*
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el contenedor de la tabla de contenido
  const tocContainer = document.querySelector(".post-toc");

  // Seleccionar todos los encabezados h1, h2, h3, etc.
  const headings = document.querySelectorAll("h1.toc-add, h2.toc-add, h3.toc-add, h4.toc-add, h5.toc-add, h6.toc-add");

  // Variables para el seguimiento de niveles
  let nivelAnterior = 1;
  let rootTocTag = tocContainer;
  let ultimoElementoLista = tocContainer;
  let contador = Array.from({ length: 6 }, () => 0); // Contador para cada nivel, inicializado en 0

  // Iterar sobre los encabezados para construir la tabla de contenido
  headings.forEach((heading) => {
    // Obtener el nivel del encabezado (h1, h2, etc.)
    const nivel = parseInt(heading.tagName.charAt(1));

    // Comparar niveles y ajustar la estructura de la lista
    if (nivel > nivelAnterior) {
      const nuevoOl = document.createElement("ol");
      nuevoOl.classList.add("post-toc-child", "post-toc-expand");
      ultimoElementoLista.appendChild(nuevoOl);
      ultimoElementoLista = nuevoOl;
    } else if (nivel < nivelAnterior) {
      for (let i = nivel; i < nivelAnterior; i++) {
        ultimoElementoLista = ultimoElementoLista.parentElement; // Retroceder dos niveles para salir de la lista anidada
      }
    }

    // Incrementar el contador del nivel actual y restablecer contadores de niveles superiores
    contador[nivel - 1]++;
    for (let i = nivel; i < contador.length; i++) {
      contador[i] = 0;
    }

    // Crear el elemento li para la tabla de contenido
    const tocItem = document.createElement("li");
    tocItem.classList.add("post-toc-item", `post-toc-level-${nivel}`);

    // Crear el enlace para el elemento de la tabla de contenido
    const tocLink = document.createElement("a");
    tocLink.classList.add("post-toc-link");
    tocLink.href = `#${heading.id}`;

    // Construir la numeración con el formato correcto
    let numeracion = contador.slice(0, nivel).join(".");

    tocLink.innerHTML = `<span class="post-toc-number">${numeracion}</span> <span class="post-toc-text">${heading.textContent}</span>`;

    // Agregar el enlace al elemento li
    tocItem.appendChild(tocLink);

    if (nivel === 1) {
      ultimoElementoLista = rootTocTag;
      ultimoElementoLista.appendChild(tocItem);
      ultimoElementoLista = tocItem;
    } else {
      // Agregar el elemento li al contenedor de la tabla de contenido
      ultimoElementoLista.appendChild(tocItem);
    }

    // Actualizar el nivel anterior
    nivelAnterior = nivel;

    // Verificar la visibilidad del encabezado en la página
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Agregar la clase "active" al elemento li si es visible
            tocItem.classList.add("active");
          } else {
            // Quitar la clase "active" si no es visible
            tocItem.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 } // Puedes ajustar el umbral según tus necesidades
    );

    // Observar el encabezado actual
    observer.observe(heading);
  });
});

*/
