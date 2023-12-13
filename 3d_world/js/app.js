function main() {
    //scene camera renderer - 3 musts!
    const canvas = document.querySelector('#c')

    //Camera
    const fov = 75
    const aspect = canvas.clientWidth / canvas.clientHeight
    const near = 0.1
    const far = 2000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 1

    // Renderer
    const renderer = new THREE.webGLRenderer({ canvas })

    renderer.setSize(width, height)
    new THREE.OrbitControls(camera, canvas)

    //Scene

    const scene = new THREE.Scene()
    const loader = new THREE.textureLoader()
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg');
    () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)

        rt.fromEquirectangularTexture(renderer, texture)

        scene.background = rt.texture
    }
}
function render() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height, false)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
main();


