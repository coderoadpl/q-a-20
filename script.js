console.log("Hello");

const init = (() => {
  const randomizeColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red},${green},${blue} )`;
    return color;
  };

  const renderNumberElement = (color) => {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.backgroundColor = color;
    div.style.borderRadius = "50%";
    div.style.display = "flex";
    div.style.alginItems = "center";
    div.style.justifyContent = "center";
    div.textContent = Math.floor(Math.random() * 49 + 1);
    return div;
  };

  const clearContainer = (container) => {
    container.innerHTML = "";
  };

  const renderNumberElements = (count) => {
    const container = renderContainer();
    for (let i = 0; i < count; i++) {
      const numberElement = renderNumberElement(randomizeColor());
      container.appendChild(numberElement);
    }
    return container;
  };

  const renderContainer = () => document.createElement("div");

  const renderButtonElement = (label, callback) => {
    const button = document.createElement("button");
    button.innerText = label;
    button.addEventListener("click", callback);
    return button;
  };

  const renderButtonElements = (buttonDefinitions) => {
    const container = renderContainer();
    buttonDefinitions.forEach((buttonDefinition) => {
      const { label, callback } = buttonDefinition;
      const buttonElement = renderButtonElement(label, callback);
      container.appendChild(buttonElement);
    });
    return container;
  };

  const makeButtonCallback = (container) => (count) => {
    clearContainer(container);
    const numberElements = renderNumberElements(count);
    container.appendChild(numberElements);
  };

  const init = (numbers, mainContainer = document.body) => {
    const numberContainer = renderContainer();
    const makeButtonCollbackWithContainer = makeButtonCallback(numberContainer);

    const buttonDefinitions = numbers
      .map((number) => {
        return {
          label: `Randomize ${number}`,
          callback: () => makeButtonCollbackWithContainer(number)
        };
      })
      .concat({
        label: "Clear",
        callback: () => clearContainer(numberContainer)
      });

    const buttonElements = renderButtonElements(buttonDefinitions);

    mainContainer.appendChild(buttonElements);
    mainContainer.appendChild(numberContainer);
  };

  return init;
})();
