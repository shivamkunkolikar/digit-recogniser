console.log("3ed")

const pcanvas = document.getElementById('predictCanvas');
const ctp = pcanvas.getContext('2d');
let isDrawin = false;

// Set up mouse and touch events
const startDrawingp = (e) => {
    isDrawin = true;
    ctp.beginPath();
    ctp.moveTo(getpX(e), getpY(e));
};

const drawp = (e) => {
    if (!isDrawin) return;
    ctp.lineTo(getpX(e), getpY(e));
    ctp.stroke();
};

const stopDrawingp = () => {
    isDrawin = false;
};

const getpX = (e) => (e.touches ? e.touches[0].clientX : e.clientX) - pcanvas.offsetLeft;
const getpY = (e) => (e.touches ? e.touches[0].clientY : e.clientY) - pcanvas.offsetTop;

// Event listeners for mouse and touch
pcanvas.addEventListener('mousedown', startDrawingp);
pcanvas.addEventListener('mousemove', drawp);
pcanvas.addEventListener('mouseup', stopDrawingp);
pcanvas.addEventListener('touchstart', startDrawingp);
pcanvas.addEventListener('touchmove', drawp);
pcanvas.addEventListener('touchend', stopDrawingp);



async function send_predict_image() {

    document.getElementById('convertButtonP').innerHTML = 'Loading...'
    // document.getElementById('loading').style.animation = 'an9 0.5s ease-in-out 0s infinite'

    const imageData = ctp.getImageData(0, 0, 280, 280);
    console.log(imageData)
    const pixelArray = [];

    for (let i = 3; i < imageData.data.length; i += 4) {
        // Grayscale value (R, G, B channels are the same in black & white drawings)
        const grayscaleValue = imageData.data[i];
        pixelArray.push(grayscaleValue);
    }

    let final_arr = [];
    for(let i=0 ; i<784 ; i = i+1) {
        let arr = []
        for(let j=0 ; j<10 ; j=j+1) {
            for(let k=0 ; k<10 ; k=k+1) {
                arr.push(pixelArray[(Math.floor(i/28)*(2800)+((i%28)*10)) + (j * 280) + k])
            }
        }
        final_arr[i] = find_max(arr)
    }
    
    console.log(final_arr);
    let cmp_arr = compress_arr(final_arr)
    console.log(cmp_arr)
    let can = document.getElementById('drawingP')
    let cat = can.getContext('2d')
    let img = cat.getImageData(0, 0, 28, 28);
    let ptr = 0
    final_arr = decompress_arr(cmp_arr)
    console.log(final_arr)
    for(let i=3 ; i<img.data.length ; i=i+4) {
        img.data[i] = final_arr[ptr]
        ptr = ptr + 1 
    }
    cat.putImageData(img, 0, 0)
    

    let req_body = {
        'data': cmp_arr,
    }

    let response = await fetch(url+'predictdata', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(req_body)
    })

    let response_obj = await response.json()

    // document.getElementById('loading').style.animation = ''
    document.getElementById('convertButtonP').innerHTML = 'Submit'

    if(response_obj['success'] == true) {
        show_message(response_obj['value'],`confidence: ${response_obj['conf']}%`)
        console.log(response_obj)
        // ctp.clearRect(0, 0, pcanvas.width, pcanvas.height);
    }
    else {
        show_message(response_obj['value'], '')
    }
}

document.getElementById('clearButtonP').addEventListener('click', () => {
    console.log('Clearing canvas');
    ctp.clearRect(0, 0, pcanvas.width, pcanvas.height);
});
