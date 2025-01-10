console.log("2nd")

function compress_arr(arr) {
    let cmp_arr = []
    let index = 0, state = 0, s_index = 0
    for(let i=0 ; i<arr.length ; i=i+1) {
        if(arr[i] != 0) {
            if(state === 1) {
                state = 0
                cmp_arr[index] = `z${s_index}`
                index = index + 1
                s_index = 0
            }
            cmp_arr[index] = arr[i]
            index = index + 1
        }
        else {
            if(state === 0) {
                state = 1
            }
            s_index = s_index + 1
        }
    }
    if(state === 1) {
        cmp_arr[index] = `z${s_index}`
    }
    return cmp_arr
}

function decompress_arr(carr) {
    let arr = []
    let index = 0

    for(let i=0 ; i<carr.length ; i=i+1) {
        if(isNaN(Number(carr[i]))) {
            let len = Number(carr[i].substring(1))
            for(let j=0 ; j<len ; j=j+1) {
                arr[index + j] = 0
            }
            index = index + len
        }
        else {
            arr[index] = carr[i]
            index = index + 1
        }    
    }
    return arr
}

function find_max(arr) {
    let mx = 0
    for(let i=0 ; i<arr.length ; i=i+1) {
        if(arr[i] > mx) {
            mx = arr[i]
        }
    }
    return mx
}
// let p = 0;
// let data = []
// let label = []
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Set up mouse and touch events
const startDrawing = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
};

const draw = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
};

const stopDrawing = () => {
    isDrawing = false;
};

const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX) - canvas.offsetLeft;
const getY = (e) => (e.touches ? e.touches[0].clientY : e.clientY) - canvas.offsetTop;

// Event listeners for mouse and touch
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Button to convert canvas to 28x28 array
// document.getElementById('convertButton').addEventListener('click', () => 

// let url = 'http://192.168.214.36:5000/'

async function send_image() {
    const imageData = ctx.getImageData(0, 0, 280, 280);
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
    let can = document.getElementById('drawingC')
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
    // data[p] = final_arr
    // label[p] = document.getElementById('label').value
    // p = p + 1

    let label = document.getElementById('labl').value
    if(label == '' || label > 9) {
        setErrorMsg('Enter valid label', 3)
        setTimeout(() => {
            setErrorMsg('', 3)
        }, 5000)
    }
    else {

        let req_body = {
            'data': cmp_arr,
            'label': label,
        }

        let response = await fetch(url+'adddata', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(req_body)
        })

        let response_obj = await response.json()
        if(response_obj['success'] == true) {
            setErrorMsg('Data Sent Successfully', 3)
            setTimeout(() => {
                setErrorMsg('', 3)
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 5000);
        }
        else {
            setErrorMsg('Something went Wrong !!', 3)
            setTimeout(() => {
                setErrorMsg('', 3)
            }, 5000);
        }
    }
}

document.getElementById('clearButton').addEventListener('click', () => {
    console.log('Clearing canvas');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});