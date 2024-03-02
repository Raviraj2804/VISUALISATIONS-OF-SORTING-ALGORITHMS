const bar_container = document.querySelector('.bars-container');

// Variables
const size_of_array = 200;
const min_value = 10;
const max_value = 500;

const speed_control = document.getElementById('speed-control');
let speed = 400-speed_control.value;
speed_control.addEventListener('input',(e)=>{
    speed =  400-speed_control.value;
    console.log(speed_value);
})

function reset(){
    while (bar_container.firstChild) {
        bar_container.removeChild(bar_container.firstChild);
    }
}
function swap(array,first_index,second_index){
    const bar1 = document.getElementById(`bar${first_index}`);
    const bar2 = document.getElementById(`bar${second_index}`);
    let temp = array[first_index];
    array[first_index] = array[second_index];
    array[second_index] = temp;
    bar1.style.height = `${array[first_index]}px`;
    bar2.style.height = `${array[second_index]}px`;
}
function create_random_number(min_value,max_value){
    let number = Math.floor(Math.random()*(max_value-min_value+1));
    number = number + min_value;
    return number;
}
const sleep = (time)=>{
    return new Promise(resolve=>setTimeout(resolve,time));
}
function change_color(index){
    const bar = document.getElementById(`bar${index}`);
    bar.style.backgroundColor = 'green';
}

//Generate Random Array
/////////////////////////////////////////////////////////////////////////////////////////////////////

let array = new Array();
const random_array_button = document.getElementById('random-array');
random_array_button.addEventListener('click',(e)=>{
    e.preventDefault();
    reset();
    array = [];
    for (let i=0;i<size_of_array;i++){
        let bar_height = create_random_number(min_value,max_value);
        array.push(bar_height);
        const bar = document.createElement('div');
        bar.style.height = `${bar_height}px`;
        bar.id = `bar${i}`;
        bar.classList.add('bars');
        bar_container.append(bar);
    }
    console.log(array.length);
    console.log(array);
});

//Insertion Sort
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const insertion_sort_button = document.getElementById('insertion-sort');
async function insertion_sort(array,low,high){
    for(let i=low;i<high;i++){
        let j = i;
        while(j>0 && array[j-1]>array[j]){
            swap(array,j,j-1);
            j = j-1;
            await sleep(speed);
        }
        change_color(i);
    }
}
insertion_sort_button.addEventListener('click',async (e)=>{
    e.preventDefault();
    insertion_sort(array,0,size_of_array);
    console.log(array);
});

//Selection Sort
///////////////////////////////////////////////////////////////////////////////////////////////////////////


const selection_sort_button = document.getElementById('selection-sort');
selection_sort_button.addEventListener('click',async (e)=>{
    e.preventDefault();
    for (let i=0;i<size_of_array;i++){
        min_index = i;
        for (let j=i;j<size_of_array;j++){
            if(array[j]<array[min_index]){
                min_index = j;
            }
        }
        swap(array,i,min_index);
        change_color(i);
        await sleep(speed);
    }
});

//Bubble Sort
/////////////////////////////////////////////////////////////////////////////////////////////////////////


const bubble_sort_button = document.getElementById('bubble-sort');
bubble_sort_button.addEventListener('click',async (e)=>{
    e.preventDefault();
    for (let i=size_of_array-1;i>0;i--){
        for (let j=0;j<=i;j++){
            if(array[j]>array[j+1]){
                swap(array,j,j+1);
                await sleep(speed);
            }
        }
        change_color(i);
    }
});

//Merge Sort
//////////////////////////////////////////////////////////////////////////////////////////////////

async function merge(array,low,mid,high){
    let merged_vector = [];
    let left = low; 
    let right = mid+1;
    while(left<=mid && right<=high){
        if(array[left]<=array[right]){
            merged_vector.push(array[left]);
            left++;
        }
        else{
            merged_vector.push(array[right]);
            right++;
        }
    }
    while(left<=mid){
        merged_vector.push(array[left]);
        left++;
    }
    while(right<=high){
        merged_vector.push(array[right]);
        right++;
    }
    for(let i=low;i<=high;i++){
        array[i] = merged_vector[i-low];
        const bar = document.getElementById(`bar${i}`);
        bar.style.height = `${array[i]}px`;
        change_color(i);
        await sleep(speed);
    }
}
async function merge_sort(array,low,high){
    if(low===high) return;
    let mid = Math.floor((low+high)/2);
    await merge_sort(array,low,mid);
    await merge_sort(array,mid+1,high);
    await merge(array,low,mid,high);
}


const merge_sort_button = document.getElementById('merge-sort');
merge_sort_button.addEventListener('click',async (e)=>{
    e.preventDefault();
    await merge_sort(array,0,size_of_array-1);
    console.log(array);
});

//Quick Sort
////////////////////////////////////////////////////////////////////////////////////////////////////

async function find_pivot_index(array,low,high){
    let pivot = array[low];
    let i = low; 
    let j = high;
    while(i<j){
        while(array[i]<=pivot && i<=high-1) i++;
        while(array[j]>pivot && j>=low+1) j--;
        if(i<j){
            swap(array,i,j);
            await sleep(speed);
        }
    }
    swap(array,low,j);
    await sleep(speed);
    return j;
}
async function quick_sort(array,low,high){
    if(low<high){
        let pivot_index = await find_pivot_index(array,low,high);
        await quick_sort(array,low,pivot_index-1);
        await quick_sort(array,pivot_index+1,high);
    }
}

const quick_sort_button = document.getElementById('quick-sort');
quick_sort_button.addEventListener('click',async (e)=>{
    e.preventDefault();
    await quick_sort(array,0,size_of_array-1);
    console.log(array);
});