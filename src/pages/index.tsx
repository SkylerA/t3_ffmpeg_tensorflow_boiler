import { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// FFMpeg
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// Tensorflow
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

const ffmpeg = createFFmpeg({
  log: true,
  // next local dev is finnicky and i can't get it to just load the local copy so we have grab an external copy for dev
  corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
});

const Home: NextPage = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [model, setModel] = useState<tf.GraphModel | null>(null);

  async function loadFFmpeg() {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    } else {
      console.log("ffmpeg has already been loaded");
    }
  }

  async function loadModel() {
    const graphModel = await loadGraphModel("./tfjs_model/model.json");
    setModel(graphModel);
  }

  useEffect(() => {
    loadFFmpeg().catch((e) => console.log(`loadFFmpeg error: ${e}`));
    loadModel().catch((e) => console.log(`loadFFmpeg error: ${e}`));
  }, []);

  const infer = async (img: tf.Tensor) => {
    const img_size = 34;
    // TODO cache the model
    // const model = await loadModel();
    console.log(model);

    const test = img
      .resizeNearestNeighbor([img_size, img_size])
      .toFloat()
      .expandDims();
    const results = model?.predict(test);
    const predictions = results?.arraySync();

    const classIdx = results?.as1D().argMax().dataSync()[0];

    console.log(classIdx, predictions);
  };

  const inferHtmlImg = async (img: HTMLImageElement) => {
    const tensor = tf.browser.fromPixels(img);
    await infer(tensor);
  };

  const inferImage = async (file: File) => {
    return new Promise((resolve) => {
      // load file as image
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        // run inference once image loads
        image.onload = () => {
          // this is hardcoded for gg btns currently
          const img_size = 34;
          const tensor = tf.browser
            .fromPixels(image)
            .resizeNearestNeighbor([img_size, img_size])
            .toFloat()
            .expandDims();
          const results = model.predict(tensor);
          const predictions = results.arraySync();

          const classIdx = results.as1D().argMax().dataSync()[0];

          // return class index and prediction array for image
          const retVal = [classIdx, predictions];
          resolve(retVal);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagesSelected = async (files: File[]) => {
    if (model) {
      const results = await Promise.all(
        Array.from(files).map((file) => inferImage(file))
      );

      console.log(results);
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* <button onClick={loadFFmpeg}>test ffmpeg</button>
          <button onClick={loadModel}>test model</button> */}

          <p>
            <img ref={imgRef} src="/d.png" />
            <button onClick={() => inferHtmlImg(imgRef.current)}>infer</button>
          </p>
          <p>
            <label>
              Infer Loaded Images
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={(e) => handleImagesSelected(e.currentTarget.files)}
                multiple
              />
            </label>
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
