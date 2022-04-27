import * as THREE from 'three';
import { useEffect, useRef } from "react";

import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';
import { RGBELoader } from './RGBELoader.js';
import HdrFile from "./textures/royal_esplanade_1k.hdr";
import Helmet from "./models/glTF/DamagedHelmet.gltf"
import Zard from "./models/zard_card/scene.gltf"

const CardInspector = ({CardFrontURL, CardBackURL}) => {

    const mountRef = useRef(null);

    useEffect(() => {

        let camera, scene, renderer;

        init();
        render();

        function init() {

            const container = document.createElement('div');
            container.className = "grabbable";
            let ci = document.querySelector('#CI')
            ci.appendChild(container);

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
            camera.position.set(-1.8, 0.6, 2.7);

            scene = new THREE.Scene();

            new RGBELoader()
                //.setPath('textures/')
                .load(HdrFile, function (texture) {
                    //alert(texture);
                    texture.mapping = THREE.EquirectangularReflectionMapping;

                    scene.background = texture;
                    scene.environment = texture;

                    render();

                    // model

                    const loader = new GLTFLoader()//.setPath('models/');
                    loader.load(Zard, function (gltf) {
                        //alert(JSON.stringify(gltf));
                        scene.add(gltf.scene);

                        render();

                    });

                });

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth / 2.7, window.innerHeight / 2.7);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render); // use if there is no animation loop
            controls.minDistance = 2;
            controls.maxDistance = 10;
            controls.target.set(0, 0, -0.2);
            controls.update();

            window.addEventListener('resize', onWindowResize);

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            render();

        }

//

        function render() {

            renderer.render(scene, camera);

        }
    }, []);

    return (
        <div ref={mountRef} style={{marginLeft: '-10ex', borderRadius: '25px'}}>

        </div>
    );
}

export default CardInspector;