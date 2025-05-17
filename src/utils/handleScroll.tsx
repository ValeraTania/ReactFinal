

 export const scrollById = (id: string, direction: "left" | "right") =>{
    const divContainer = document.getElementById(id);
    if (!divContainer) return;

    divContainer.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  }

  

