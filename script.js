//your code here
function minimumCost(arr) {
    if (arr.length === 0) {
        return 0;
    }
  
    // Create a min heap
    let minHeap = new MinHeap(arr);
  
    let totalCost = 0;
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        let rope1 = minHeap.extractMin();
        let rope2 = minHeap.extractMin();
      
        // Add their sum to the total cost
        let cost = rope1 + rope2;
        totalCost += cost;
      
        // Add the sum of the two ropes back to the heap
        minHeap.insert(cost);
    }
  
    return totalCost;
}

// MinHeap implementation
class MinHeap {
    constructor(arr) {
        this.heap = [];
        for (let i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    insert(element) {
        this.heap.push(element);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        let min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    heapifyUp(index) {
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    heapifyDown(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }
        if (smallestIndex !== index) {
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            this.heapifyDown(smallestIndex);
        }
    }
}
