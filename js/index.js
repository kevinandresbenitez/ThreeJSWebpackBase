import * as THREE from '../node_modules/three/build/three.module.js';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

class main{

    //Static
    static x;
    static y;

    static init(){
        this.defineInstances();

        this.scene.add(this.create.ambientLight());
        this.scene.add(this.create.pointLight());
        this.scene.add(this.create.cube());

        this.render();
    }

    static defineInstances(){
        //Scene
        this.scene = new THREE.Scene();
        //Camera
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight ,0.1,1000);
        this.camera.position.set(0,0,3);
        //Renderer
        this.renderer = new THREE.WebGLRenderer({antialias:true,canvas:document.getElementById('Canvas')});
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.setClearColor('#8d9496');
        // Controls
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);
        
    }

    static create ={
        cube:()=>{
            const geometry = new THREE.BoxGeometry(1,1,1);
            const material = new THREE.MeshStandardMaterial({color:'#9ebdbb'});
            const cube = new THREE.Mesh(geometry,material);
            return cube ;
        },

        ambientLight:()=>{
            return new THREE.AmbientLight( 0x404040 );
        },

        pointLight:()=>{
            const light = new THREE.PointLight( 0xff0000, 1, 100 );
            light.position.set( 50, 50, 50 );
            return light;
        }
    }

    static mouseAnimation = (event)=>{
        this.x = event.clientX - window.innerWidth /2;
        this.y = event.clientY - window.innerHeight /2;
    }

    static resize = ()=>{
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight);
    }

    static render = ()=>{
        requestAnimationFrame(this.render);
        

        let tarjetY = this.y * .001;
        let tarjetX = this.x * .001

        let cube = this.scene.children[2];
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01 ;
        cube.position.z = -1 * (tarjetY + tarjetX);

        this.controls.update();
        this.renderer.render(this.scene,this.camera);
    }
}

main.init();
window.addEventListener('mousemove',main.mouseAnimation);
window.addEventListener('resize',main.resize);