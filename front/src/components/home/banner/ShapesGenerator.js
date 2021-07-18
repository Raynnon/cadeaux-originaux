function shapesGenerator({ minTop, maxTop, minLeft, maxLeft }) {
  const colors = [
    "#FF3629",
    "#FC4AAC",
    "#fce145",
    "#76fd3c",
    "#29A9FF",
    "#5E29FF",
  ];

  const shapes = ["circle", "pill", "halo", "triangle"];

  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const shape = shapes[randomNum(0, shapes.length)];

  const color = colors[randomNum(0, colors.length)];

  const top = randomNum(minTop, maxTop) + "%";

  const left = randomNum(minLeft, maxLeft) + "%";

  const rotation = randomNum(0, 180);

  if (shape === "triangle") {
    return (
      <div
        className="triangle"
        style={{
          top,
          left,
          borderStyle: "solid",
          borderWidth: "0 1.5vw 2vw 1.5vw",
          borderColor: "transparent transparent " + color + " transparent",
          transform: "rotate(" + rotation + "deg)",
        }}
      ></div>
    );
  } else if (shape === "pill") {
    return (
      <div
        className="pill rounded-pill"
        style={{
          top,
          left,
          width: "0.5vw",
          height: "2.5vw",
          backgroundColor: color,
          transform: "rotate(" + rotation + "deg)",
        }}
      ></div>
    );
  } else if (shape === "circle") {
    return (
      <div
        className="circle"
        style={{
          top,
          left,
          width: "1.7vw",
          height: "1.7vw",
          backgroundColor: color,
        }}
      ></div>
    );
  } else {
    return (
      <div
        className="halo"
        style={{
          top,
          left,
          boxShadow: "0 0 1.2vw 1.2vw " + color,
        }}
      ></div>
    );
  }
}

export default shapesGenerator;
