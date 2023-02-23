import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Loaders

const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/public/textures/1.png')

//mesh

const geometry = new THREE.SphereGeometry(0.8, 64, 64);
const material = new THREE.MeshStandardMaterial({
    roughness:0,
    metalness:0.4,
    transparent:true,
    opacity:0.5,
    color:"rgb(255,255,255)",
});
const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
mesh.castShadow = true;
mesh.position.set(0,0.37,-1)
scene.add(mesh)
/**
 * Particles
 */
const particlesCount = 2000
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = 4 * 0.5 -  Math.random() * 4 * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position',  new THREE.BufferAttribute(positions,3))

//material
const particlesMaterial = new THREE.PointsMaterial({
    color:'#FFFFFF', //'#BE9C37' 
    sizeAttenuation:true,
    size: 0.06,
    alphaMap: particleTexture,
    transparent:true,
    alphaTest: 0.001,
    depthWrite:false
})
console.log(mesh.material.color)
//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)

/**
 * light
 */

const light = new THREE.PointLight('#FFFFFF', 1, 100)
light.position.set(10,10,10)
scene.add(light)

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,6)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)

function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );

}
//Small animations
const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1,x:1,y:1})
tl.from(".container",{y:-10, delay:0.1, ease:'linear', autoAlpha:0})
render()

document.addEventListener('scroll', (e) => {
    let value = Math.floor((window.pageYOffset / Math.PI) / 20 + 10)
    console.log(value)
    light.position.set(10,10,value)
  })