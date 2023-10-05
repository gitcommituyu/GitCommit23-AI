let classifier;
  // URL de nuestro módelo de inteligencia artificial
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/pSIOEG5Ij/';
  
  let video;
  let flippedVideo;
  let label = "";

  // Cargamos el modelo
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Empezamos la captura de video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Empezamos a correr el modelo
    classifyVideo();
  }

  function draw() {
    background(0);
    // Grabación constante del video
    image(flippedVideo, 0, 0);

    // Escribimos en pantalla la predicción
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
 
      let emoji;
  if (label == "Class 1") {
    emoji = "😊";
  } else if (label == "Class 2") {
    emoji = "🤣";
  } else if (label == "Class 3") {
    emoji = "🖐";
  }
  textSize(100);
  text(emoji, width / 2, height / 2);
}

  // Obtén la predicción del video actual
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // Por si tenemos un error
  function gotResult(error, results) {
    
    if (error) {
      console.error(error);
      return;
    }

    label = results[0].label;
    classifyVideo();
  }
