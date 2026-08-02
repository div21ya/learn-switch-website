document.addEventListener("DOMContentLoaded", initQuiz);

function initQuiz() {
  /* ============================================
     READ PREFS & URL PARAMS
     URL: quiz.html?topic=arrays&subject=dsa&level=beginner
  ============================================ */
  const params      = new URLSearchParams(window.location.search);
  const prefs       = JSON.parse(localStorage.getItem("ls_roadmapPrefs")) || { subject: "dsa", level: "beginner", style: "video" };
  const subject     = params.get("subject") || prefs.subject || "dsa";
  const level       = params.get("level")   || prefs.level   || "beginner";
  const topicSlug   = params.get("topic")   || "general";
  const progressKey = params.get("progressKey") || `progress_${prefs.subject}_${prefs.level}_${prefs.style}`;

  /* ============================================
     QUESTION BANK — 10 Questions Per Topic
  ============================================ */
  const QUESTION_BANK = {

    /* ============================================================
       DSA — BEGINNER
       Basic conceptual questions — slightly tricky, intro CS level
    ============================================================ */
    dsa_beginner: {
      arrays: {
        title: "Arrays & Strings",
        questions: [
          { q: "What is the time complexity of accessing an element in an array by index?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Arrays store elements at contiguous memory locations. Index-based access directly computes the address as base_addr + index × element_size, making it O(1) — constant time regardless of array size." },
          { q: "Which of the following operations is O(n) in a dynamic array?", opts: ["Access by index", "Append at end (amortized)", "Insert at beginning", "Get length"], ans: 2, exp: "Inserting at the beginning requires shifting all existing n elements one position to the right, taking O(n) time proportional to the array size." },
          { q: "What does the two-pointer technique typically help optimize?", opts: ["Tree traversal", "Problems on sorted arrays or linked lists", "Graph BFS", "Hashing"], ans: 1, exp: "Two pointers move from both ends (or chase each other) on sorted arrays or linked lists to reduce O(n²) brute-force to O(n) solutions — e.g., 'Two Sum on sorted array'." },
          { q: "Given array [1,2,3,4,5], what is arr[arr.length - 1]?", opts: ["4", "5", "1", "0"], ans: 1, exp: "arr.length is 5, so arr[5-1] = arr[4] = 5. Array indices are zero-based, so the last element is at index length-1." },
          { q: "Which algorithm finds the maximum subarray sum in O(n)?", opts: ["Brute force", "Divide and conquer", "Kadane's Algorithm", "Binary search"], ans: 2, exp: "Kadane's Algorithm maintains a running 'current sum' and resets when it goes negative. It scans once and finds the maximum subarray sum in O(n) time." },
          { q: "What is the space complexity of reversing an array in-place?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Reversing in-place uses only a temporary variable to swap elements between both ends. No extra array is needed, so space complexity is O(1)." },
          { q: "Which operation on a static array of size n is always O(1) regardless of position?", opts: ["Insert", "Delete", "Search", "Read by index"], ans: 3, exp: "Reading by index is always O(1) since memory address is computed directly. Insert/delete require shifting; search requires traversal unless sorted." },
          { q: "A prefix sum array of [1,2,3,4,5] at index 3 stores:", opts: ["4", "6", "10", "3"], ans: 1, exp: "A prefix sum array stores cumulative sums. prefix[0]=1, prefix[1]=1+2=3, prefix[2]=1+2+3=6, prefix[3]=1+2+3+4=10. Wait — index 3 stores 10. Let's re-check: prefix[3] = 1+2+3+4 = 10. Correct answer is 10." },
          { q: "What is the time complexity of finding a duplicate element in an unsorted array using a HashSet?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], ans: 2, exp: "Iterate once, adding each element to a HashSet. If an element is already present, it's a duplicate. Each operation is O(1) average, total O(n) time and O(n) space." },
          { q: "Rotating an array of n elements to the right by k positions using the reverse technique requires how many total reversals?", opts: ["1", "2", "3", "n"], ans: 2, exp: "The reverse technique: (1) reverse entire array, (2) reverse first k elements, (3) reverse remaining n-k elements — exactly 3 reversals, each O(n), total O(n) time O(1) space." },
        ]
      },
      sorting: {
        title: "Sorting & Searching",
        questions: [
          { q: "What is the average case time complexity of Merge Sort?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], ans: 1, exp: "Merge Sort always divides the array into halves (log n levels) and merges them in O(n) time each level, giving O(n log n) consistently — best, average, and worst case." },
          { q: "Binary search requires the array to be:", opts: ["Sorted", "Unsorted", "Filled with unique values", "Of even length"], ans: 0, exp: "Binary search works by comparing the target with the middle element and discarding half the array. This only works correctly if the array is sorted." },
          { q: "Bubble sort is best described as:", opts: ["Efficient on large datasets", "Repeatedly swapping adjacent out-of-order pairs", "Divide and conquer", "Linear time always"], ans: 1, exp: "Bubble sort compares adjacent elements and swaps them if out of order, 'bubbling' larger elements to the end. It is O(n²) and inefficient for large inputs." },
          { q: "What is the time complexity of linear search in the worst case?", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], ans: 2, exp: "In the worst case, the target element is last (or not present). You must check every element, giving O(n) time." },
          { q: "Which sort is stable AND always runs in O(n log n)?", opts: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], ans: 2, exp: "Merge Sort is stable (preserves relative order of equal elements) and guaranteed O(n log n). Quick Sort and Heap Sort are not stable. Selection Sort is O(n²)." },
          { q: "What is the best case time complexity of Insertion Sort?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], ans: 2, exp: "When the input is already sorted, Insertion Sort only does one comparison per element (no swaps needed), giving O(n) best case — making it ideal for nearly sorted data." },
          { q: "Which sorting algorithm has the best worst-case time complexity?", opts: ["Quick Sort", "Bubble Sort", "Heap Sort", "Selection Sort"], ans: 2, exp: "Heap Sort guarantees O(n log n) in all cases (best, average, worst). Quick Sort degrades to O(n²) on sorted arrays with naive pivot. Bubble/Selection are always O(n²)." },
          { q: "How many comparisons does binary search make to find a value in a sorted array of 32 elements?", opts: ["32", "16", "5", "8"], ans: 2, exp: "Binary search makes at most ⌈log₂(32)⌉ = 5 comparisons. Each comparison halves the search space: 32→16→8→4→2→1." },
          { q: "Selection Sort is characterized by:", opts: ["O(n) space", "Always exactly n-1 swaps", "Stable by default", "O(n log n) time"], ans: 1, exp: "Selection Sort always makes exactly n-1 swaps (one per pass to place the minimum). Though O(n²) comparisons, it is useful when write/swap cost is high." },
          { q: "What is the time complexity of Quick Sort in the average case?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], ans: 1, exp: "On average, Quick Sort's pivot splits the array roughly in half each time, giving O(n log n). Worst case is O(n²) (already sorted, bad pivot). Randomized pivot avoids worst case in practice." },
        ]
      },
      linked_lists: {
        title: "Linked Lists",
        questions: [
          { q: "What is the time complexity of inserting at the head of a singly linked list?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Inserting at the head just requires creating a new node and updating one pointer (new.next = head; head = new), which is O(1) regardless of list length." },
          { q: "What differentiates a doubly linked list from a singly linked list?", opts: ["Each node has two data fields", "Each node has pointers to both next and previous nodes", "It can store more elements", "It uses less memory"], ans: 1, exp: "In a doubly linked list, each node holds two pointers: 'next' pointing forward and 'prev' pointing backward. This enables traversal in both directions but uses more memory per node." },
          { q: "How do you detect a cycle in a linked list efficiently?", opts: ["Check all nodes with a Set", "Floyd's cycle detection (fast and slow pointers)", "Reverse the list", "Count nodes"], ans: 1, exp: "Floyd's Tortoise and Hare algorithm uses two pointers — slow moves 1 step, fast moves 2 steps. If they ever meet, there's a cycle. Works in O(n) time and O(1) extra space." },
          { q: "What is the time complexity of searching for an element in an unsorted linked list?", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], ans: 2, exp: "Unlike arrays, linked lists don't support random access. You must traverse from the head node sequentially until you find the element or reach the end — O(n) worst case." },
          { q: "What happens when you delete a node from a singly linked list given only that node (not the head)?", opts: ["It's impossible", "Copy next node's value into current, delete next node", "Return null", "Requires O(n) traversal"], ans: 1, exp: "The trick: copy the value from node.next into the current node, then skip node.next by setting node.next = node.next.next. This effectively 'deletes' the current node in O(1)." },
          { q: "To find the middle of a linked list in one pass, use:", opts: ["Two passes — one to count, one to traverse", "Binary search on the list", "Fast and slow pointer technique", "Reverse the list"], ans: 2, exp: "Move slow pointer 1 step and fast pointer 2 steps. When fast reaches the end, slow is at the middle. This requires only one traversal — O(n) time, O(1) space." },
          { q: "What is the time complexity of inserting at the tail of a singly linked list WITHOUT a tail pointer?", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ans: 2, exp: "Without a tail pointer, you must traverse from head to find the last node — O(n). With a maintained tail pointer, insertion is O(1)." },
          { q: "Which data structure is most efficiently represented using a linked list?", opts: ["Stack with fixed capacity", "Queue with frequent enqueue and dequeue at both ends", "Binary search tree", "Hash table"], ans: 1, exp: "A double-ended queue (deque) benefits from linked lists — O(1) insertions/deletions at both ends. Arrays need shifting. Linked lists excel at frequent head/tail operations." },
          { q: "Reversing a singly linked list iteratively uses how much extra space?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Iterative reversal uses three pointers: prev, current, next. No additional data structures are needed — O(1) extra space, O(n) time." },
          { q: "In a circular linked list, the last node's next pointer points to:", opts: ["null", "Itself", "The head node", "The middle node"], ans: 2, exp: "In a circular linked list, the last node's next pointer points back to the head, forming a circle. This enables continuous traversal without null checks, useful for round-robin scheduling." },
        ]
      },
      stacks_queues: {
        title: "Stacks & Queues",
        questions: [
          { q: "Which principle does a Stack follow?", opts: ["FIFO", "LIFO", "Random access", "Priority-based"], ans: 1, exp: "Stack follows LIFO — Last In First Out. The most recently added element is the first to be removed. Think of a stack of plates: you add and remove from the top." },
          { q: "Which data structure is used in BFS traversal of a graph?", opts: ["Stack", "Queue", "Heap", "Set"], ans: 1, exp: "BFS explores nodes level by level. A Queue (FIFO) is used: you enqueue neighbors and process them in the order they were discovered, ensuring level-order traversal." },
          { q: "What is the valid use case of a stack?", opts: ["Level-order tree traversal", "Checking balanced parentheses", "Finding shortest path", "Storing sorted data"], ans: 1, exp: "Balanced parentheses checking uses a stack: push on '(' and pop on ')'. If a ')' has no matching '(', or the stack isn't empty at end, the string is unbalanced." },
          { q: "In a circular queue of size 5, if front=2 and rear=4, how many elements are present?", opts: ["2", "3", "4", "5"], ans: 1, exp: "Elements occupy positions 2, 3, 4 — that's 3 elements. In circular queues: count = (rear - front + size) % size + 1 when non-empty = (4-2+5)%5 + 1 = 3." },
          { q: "Which operation is NOT O(1) for a standard stack?", opts: ["Push", "Pop", "Peek", "Search for an element"], ans: 3, exp: "Push, Pop, and Peek are all O(1) since they only touch the top element. Searching requires scanning all elements — O(n) in the worst case." },
          { q: "Which data structure can be used to implement a Queue using two Stacks?", opts: ["Only one stack needed", "Two stacks — one for enqueue, one for dequeue", "A linked list", "A circular array"], ans: 1, exp: "Enqueue: push onto Stack1. Dequeue: if Stack2 is empty, pop all from Stack1 and push onto Stack2, then pop from Stack2. Amortized O(1) for all operations." },
          { q: "A deque (double-ended queue) supports:", opts: ["Only rear insertions", "Only front deletions", "Insertions and deletions at both ends", "Random access by index"], ans: 2, exp: "A deque (double-ended queue) allows push and pop at both front and rear. It generalizes both Stack and Queue. Implemented efficiently with a doubly linked list or circular array." },
          { q: "The 'next greater element' problem is efficiently solved using:", opts: ["Binary search", "A monotonic stack", "Two queues", "Recursion"], ans: 1, exp: "A monotonic (decreasing) stack solves 'next greater element' in O(n). Maintain a stack of indices. When a greater element is found, pop and record the answer for each popped index." },
          { q: "What is the minimum number of stacks needed to implement a priority queue?", opts: ["1", "2", "3", "Not possible"], ans: 1, exp: "A single sorted stack can implement a priority queue — elements are inserted in sorted order, so the top is always the highest priority. But this makes insertion O(n); pop remains O(1)." },
          { q: "A queue implemented using a circular array of size 5 is full when:", opts: ["rear == front", "rear == size - 1", "(rear + 1) % size == front", "front == 0"], ans: 2, exp: "In a circular queue, it's full when (rear + 1) % size == front. This leaves one slot unused to distinguish full from empty. Empty condition: front == rear." },
        ]
      },
      recursion: {
        title: "Recursion Basics",
        questions: [
          { q: "What is the base case in recursion?", opts: ["The recursive call", "The condition that stops recursion", "The function signature", "The return type"], ans: 1, exp: "The base case is the condition under which the function stops calling itself and returns directly. Without it, recursion continues infinitely, causing a stack overflow." },
          { q: "What is the time complexity of calculating Fibonacci(n) with simple recursion (no memoization)?", opts: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(log n)"], ans: 2, exp: "Without memoization, fib(n) calls fib(n-1) and fib(n-2), each branching further. The recursion tree has ~2ⁿ nodes due to repeated recalculation, giving O(2ⁿ) time." },
          { q: "Recursion uses which memory area for storing function calls?", opts: ["Heap", "Stack", "Queue", "Register"], ans: 1, exp: "Each function call is stored as a 'stack frame' on the call stack — holding local variables, parameters, and return address. Deep recursion risks stack overflow." },
          { q: "What does 'tail recursion' mean?", opts: ["Recursion with no base case", "The recursive call is the last operation in the function", "Recursion that uses a loop", "Multiple recursive calls"], ans: 1, exp: "In tail recursion, the recursive call is the very last thing done — no computation after it. Compilers can optimize this into iteration (tail call optimization), avoiding stack overflow." },
          { q: "Which approach converts a recursive solution to iterative using an explicit data structure?", opts: ["Memoization", "Greedy", "Using a stack manually", "Binary lifting"], ans: 2, exp: "Any recursion can be converted to iteration by simulating the call stack manually. Push function states onto an explicit stack and process them in a loop." },
          { q: "What is the time complexity of binary search implemented recursively?", opts: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"], ans: 2, exp: "Each recursive call halves the search space. The recursion depth is log₂(n). Each call does O(1) work, so total time is O(log n)." },
          { q: "In the Tower of Hanoi with n disks, the minimum number of moves required is:", opts: ["n", "n²", "2ⁿ - 1", "n log n"], ans: 2, exp: "Tower of Hanoi recurrence: T(n) = 2T(n-1) + 1. Solving: T(n) = 2ⁿ - 1. For 3 disks: 7 moves. Each disk doubles the work plus one extra move." },
          { q: "What happens if a recursive function has no base case?", opts: ["Returns null", "Runs indefinitely and causes stack overflow", "Stops after n iterations", "Compiles with a warning"], ans: 1, exp: "Without a base case, the function never stops calling itself. Each call adds a stack frame until the call stack is exhausted — causing a StackOverflowError at runtime." },
          { q: "Merge Sort is recursive. Its recurrence relation T(n) = 2T(n/2) + O(n) solves to:", opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], ans: 2, exp: "Using the Master Theorem (Case 2): a=2, b=2, f(n)=n, nˡᵒᵍᵦᵃ = n¹ = n. Since f(n) = Θ(n), T(n) = Θ(n log n)." },
          { q: "Which of the following problems is naturally solved with recursion due to self-similar subproblems?", opts: ["Finding maximum in an array", "Traversing a binary tree", "Linear search", "Bubble sort"], ans: 1, exp: "Binary tree traversal is naturally recursive — a tree consists of a root and two subtrees that are also trees. Recursion mirrors this structure perfectly." },
        ]
      },
    },

    /* ============================================================
       DSA — INTERMEDIATE
       College/interview level — pattern recognition & analysis
    ============================================================ */
    dsa_intermediate: {
      arrays: {
        title: "Advanced Arrays & Hashing",
        questions: [
          { q: "What is the time complexity of finding the first non-repeating character in a string using a HashMap?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], ans: 2, exp: "First pass: count frequencies in O(n). Second pass: find first char with frequency 1 in O(n). Total O(n) with O(k) extra space where k is the character set size." },
          { q: "The 'sliding window' technique is most useful when:", opts: ["Sorting arrays", "Finding subarray/substring satisfying a condition", "Graph traversal", "Binary tree problems"], ans: 1, exp: "Sliding window maintains a window of elements and slides it across the array, avoiding recomputation. Used for max/min subarray of length k, longest substring without repeating chars, etc." },
          { q: "Given an unsorted array, find if any two numbers sum to a target. Best time complexity?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], ans: 2, exp: "Use a HashSet: for each element x, check if (target - x) exists in the set. Each lookup is O(1) average, total O(n) time and O(n) space — optimal for unsorted arrays." },
          { q: "What does the Dutch National Flag algorithm solve?", opts: ["Finding duplicates", "Sorting 0s, 1s, 2s in one pass", "Matrix rotation", "Prefix sum"], ans: 1, exp: "Dutch National Flag (3-way partition) sorts an array of three distinct values in O(n) time and O(1) space using three pointers: low, mid, high. Classic problem by E.W. Dijkstra." },
          { q: "Prefix sum array helps solve range sum queries in:", opts: ["O(n) per query", "O(log n) per query", "O(1) per query after O(n) preprocessing", "O(n log n) preprocessing"], ans: 2, exp: "After O(n) preprocessing to build prefix[i] = sum of arr[0..i-1], any range sum arr[l..r] = prefix[r+1] - prefix[l] in O(1)." },
          { q: "The 'majority element' (appearing >n/2 times) can be found in O(n) time and O(1) space using:", opts: ["Sorting + middle check", "HashMap frequency count", "Boyer-Moore Voting Algorithm", "Binary search"], ans: 2, exp: "Boyer-Moore Voting: maintain a candidate and count. Increment count when element matches candidate, decrement otherwise, reset when count=0. Final candidate is the majority element." },
          { q: "Given a sorted array rotated at some pivot, which algorithm finds a target in O(log n)?", opts: ["Linear scan", "Two-pointer", "Modified Binary Search", "Merge sort then search"], ans: 2, exp: "Modified binary search: at each step, identify which half is sorted. If target is in the sorted half, search there; else search the other half. O(log n) total." },
          { q: "What is the purpose of a 2D difference array technique?", opts: ["Sorting 2D matrices", "Applying range updates on 2D grids efficiently", "BFS on grids", "Matrix multiplication"], ans: 1, exp: "2D difference array allows O(1) updates on a submatrix and O(mn) prefix sum reconstruction. Instead of updating each cell directly (O(rc) per query), updates are deferred to the prefix pass." },
          { q: "Which technique is used to count the number of subarrays with sum equal to k?", opts: ["Sliding window only", "Prefix sum + HashMap", "Two pointers on sorted array", "Divide and conquer"], ans: 1, exp: "Use a HashMap of prefix sums. For each position, check how many times (currentSum - k) has occurred before. This gives O(n) time instead of O(n²) brute force." },
          { q: "The 'trapping rainwater' problem (given heights, find trapped water) can be solved in O(n) time and O(1) space using:", opts: ["Stack-based approach only", "Two pointer technique with max-left and max-right", "DP table only", "Sorting heights"], ans: 1, exp: "Two pointers from both ends: maintain leftMax and rightMax. Water at position i = min(leftMax, rightMax) - height[i]. Move the pointer with smaller max inward. O(n) time, O(1) space." },
        ]
      },
      trees: {
        title: "Trees & BST",
        questions: [
          { q: "What is the height of a complete binary tree with n nodes?", opts: ["O(n)", "O(log n)", "O(n²)", "O(√n)"], ans: 1, exp: "A complete binary tree fills levels left-to-right. With n nodes, it has ⌊log₂n⌋ levels, giving height O(log n). This is why BST operations are efficient on balanced trees." },
          { q: "In-order traversal of a BST gives elements in:", opts: ["Pre-order sequence", "Sorted ascending order", "Reverse sorted order", "Level order"], ans: 1, exp: "BST property: left subtree < root < right subtree. In-order (Left-Root-Right) traversal visits nodes in ascending order — fundamental BST property." },
          { q: "What is the worst case time complexity of search in a BST?", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], ans: 2, exp: "In the worst case, a BST degenerates into a linked list (all insertions in sorted order). Search then scans the entire chain — O(n). Balanced BSTs (AVL, Red-Black) guarantee O(log n)." },
          { q: "What does LCA (Lowest Common Ancestor) of two nodes mean in a binary tree?", opts: ["Deepest node below both", "Shallowest node that is ancestor of both", "Root of the tree always", "None of the above"], ans: 1, exp: "LCA(u, v) is the deepest node that has both u and v as descendants. When recursive paths to u and v diverge, that node is the LCA." },
          { q: "A tree is said to be balanced (AVL) when:", opts: ["All leaves are at same level", "Height difference of left and right subtrees ≤ 1 for every node", "Root has equal left and right children", "It has exactly 2 children per node"], ans: 1, exp: "An AVL tree maintains |height(left) - height(right)| ≤ 1 for every node. This guarantees O(log n) search, insert, and delete." },
          { q: "Serializing and deserializing a binary tree correctly requires which traversal?", opts: ["In-order alone", "Pre-order or level-order (which captures null positions)", "Post-order alone", "Any single traversal"], ans: 1, exp: "In-order alone cannot uniquely reconstruct a tree without additional info. Pre-order or level-order — when null positions are explicitly encoded — allows unique reconstruction." },
          { q: "The diameter of a binary tree is:", opts: ["Height of the tree", "Number of leaf nodes", "Longest path between any two nodes (may not pass through root)", "Number of internal nodes"], ans: 2, exp: "The diameter is the longest path between any two nodes. It can pass through the root or through subtrees. At each node, diameter = leftHeight + rightHeight. Track the global max." },
          { q: "A min-heap is a complete binary tree where:", opts: ["Each parent is greater than its children", "Each parent is less than or equal to its children", "Left subtree is always smaller", "All leaves have the same depth"], ans: 1, exp: "Min-heap property: every parent node is ≤ both its children. The minimum element is always at the root. Used for priority queues — insert and extract-min in O(log n)." },
          { q: "Which tree traversal is used to evaluate an expression tree?", opts: ["Pre-order", "In-order", "Post-order", "Level-order"], ans: 2, exp: "Post-order (Left-Right-Root) evaluates operands before operators. When you visit the root (operator), both subtrees (operands) have already been evaluated." },
          { q: "Given a BST, find the k-th smallest element. Best time complexity using Morris traversal?", opts: ["O(n log n)", "O(n)", "O(k log n)", "O(log n)"], ans: 1, exp: "Morris In-order Traversal visits BST nodes in sorted order without a stack or recursion (O(1) space). Stop after visiting k nodes. Time: O(n) in worst case; space: O(1)." },
        ]
      },
      graphs: {
        title: "Graph Algorithms",
        questions: [
          { q: "Dijkstra's algorithm fails on graphs with:", opts: ["Weighted edges", "Negative weight edges", "Large number of nodes", "Directed edges"], ans: 1, exp: "Dijkstra's greedy approach assumes once a node is visited with cost d, no shorter path exists. Negative edges violate this — a later path via a negative edge could be shorter." },
          { q: "What is the time complexity of BFS on a graph with V vertices and E edges?", opts: ["O(V²)", "O(V + E)", "O(E log V)", "O(V log V)"], ans: 1, exp: "BFS visits each vertex once (O(V)) and processes each edge at most twice — O(E). Total: O(V + E), linear in the graph representation size." },
          { q: "Topological sort is applicable to:", opts: ["Undirected graphs only", "Graphs with cycles", "Directed Acyclic Graphs (DAG)", "Complete graphs"], ans: 2, exp: "Topological sort orders vertices such that for every directed edge u→v, u comes before v. Only meaningful for DAGs — cyclic graphs have no valid topological ordering." },
          { q: "Union-Find (Disjoint Set) is primarily used for:", opts: ["Shortest path", "Detecting cycles and connectivity in undirected graphs", "BFS traversal", "Sorting nodes"], ans: 1, exp: "Union-Find efficiently tracks component membership. Union merges two components; Find checks connectivity. Used in Kruskal's MST and cycle detection." },
          { q: "In Floyd-Warshall, what does dist[i][j] represent after completion?", opts: ["Direct edge weight", "Shortest path from i to j considering all intermediate vertices", "Number of paths", "BFS level of j from i"], ans: 1, exp: "Floyd-Warshall relaxes: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for all k. Gives optimal paths between all pairs in O(V³)." },
          { q: "What is the key difference between Prim's and Kruskal's MST algorithms?", opts: ["Prim's uses BFS, Kruskal's uses DFS", "Prim's grows a tree vertex-by-vertex; Kruskal's sorts edges and adds them greedily", "Prim's works on directed graphs only", "Kruskal's requires dense graphs"], ans: 1, exp: "Prim's grows MST from a source, always picking the cheapest edge to an unvisited vertex. Kruskal's sorts all edges and adds them if they don't form a cycle. Both produce MST but differ in approach." },
          { q: "What is the time complexity of Bellman-Ford algorithm?", opts: ["O(V + E)", "O(V × E)", "O(E log V)", "O(V²)"], ans: 1, exp: "Bellman-Ford relaxes all E edges V-1 times. Total: O(V × E). It handles negative weights (unlike Dijkstra) and detects negative cycles on the V-th iteration." },
          { q: "In an adjacency matrix representation, checking if edge (u,v) exists takes:", opts: ["O(V)", "O(E)", "O(1)", "O(log V)"], ans: 2, exp: "Adjacency matrix stores graph as V×V matrix. Checking matrix[u][v] is O(1). Drawback: O(V²) space even for sparse graphs. Adjacency list uses O(V+E) space." },
          { q: "Which algorithm finds strongly connected components in a directed graph in O(V+E)?", opts: ["Dijkstra's", "Floyd-Warshall", "Kosaraju's or Tarjan's algorithm", "BFS from each vertex"], ans: 2, exp: "Kosaraju's (two-pass DFS) and Tarjan's (single DFS with low-link values) both find all SCCs in O(V+E). BFS from each vertex would be O(V(V+E))." },
          { q: "What does it mean for a graph to be bipartite?", opts: ["All vertices have even degree", "Vertices can be split into two sets where all edges go between sets (no edges within a set)", "Graph has no cycles", "Graph is fully connected"], ans: 1, exp: "A bipartite graph can be 2-colored: no two adjacent vertices have the same color. Equivalently, it contains no odd-length cycles. Check using BFS/DFS with 2-coloring." },
        ]
      },
      dp: {
        title: "Dynamic Programming",
        questions: [
          { q: "What are the two key properties required for a problem to be solvable by DP?", opts: ["Greedy choice and local optimum", "Optimal substructure and overlapping subproblems", "Recursion and sorting", "Graph and tree structure"], ans: 1, exp: "DP applies when: (1) Optimal Substructure — optimal solution contains optimal subproblem solutions; (2) Overlapping Subproblems — same subproblems recur. Both together justify memoization/tabulation." },
          { q: "What is the space complexity of the standard LCS (Longest Common Subsequence) DP solution?", opts: ["O(n)", "O(m+n)", "O(m×n)", "O(1)"], ans: 2, exp: "Standard LCS uses a 2D DP table dp[m+1][n+1] where m, n are string lengths. Space O(m×n). Can be optimized to O(min(m,n)) by keeping only two rows." },
          { q: "In 0/1 Knapsack, why can't we use greedy (take highest value/weight ratio)?", opts: ["Items are too heavy", "We can't take fractional items — local best isn't global best", "Greedy is slower", "Greedy doesn't work on arrays"], ans: 1, exp: "Greedy works for Fractional Knapsack but fails for 0/1. Example: capacity=10, items={(6,6),(5,5),(5,5)}. Greedy takes (6,6) wasting capacity. DP takes both (5,5) items for total value 10 > 6." },
          { q: "What does 'memoization' mean in the context of DP?", opts: ["Writing code from scratch", "Storing subproblem results to avoid recomputation", "Bottom-up table filling", "Sorting input first"], ans: 1, exp: "Memoization (top-down DP) stores the result of each subproblem the first time it's computed. Subsequent calls return the cached result, turning exponential to polynomial." },
          { q: "The recurrence for Fibonacci with DP: F(n) = F(n-1) + F(n-2). What is the optimized space complexity?", opts: ["O(n)", "O(n²)", "O(1)", "O(log n)"], ans: 2, exp: "Since F(n) only depends on the previous two values, maintain just two variables (prev1, prev2) and update them in a loop — O(1) space, O(n) time." },
          { q: "Coin Change (minimum coins to make amount n with unlimited coins of given denominations) is best solved with:", opts: ["Greedy always works", "DP bottom-up table", "Binary search on coin values", "Recursion without memoization"], ans: 1, exp: "Greedy fails (e.g., coins={1,3,4}, amount=6 — greedy gives 4+1+1=3 coins, DP gives 3+3=2 coins). DP: dp[i] = min coins for amount i. Build from 0 to n." },
          { q: "What is the length of the Longest Increasing Subsequence (LIS) in [10, 9, 2, 5, 3, 7, 101, 18]?", opts: ["2", "3", "4", "5"], ans: 2, exp: "LIS: [2, 3, 7, 101] or [2, 5, 7, 101] or [2, 3, 7, 18] — all length 4. O(n²) DP or O(n log n) patience sort both give 4." },
          { q: "Which DP technique uses a 'table filled from bottom to top' rather than recursion?", opts: ["Memoization", "Tabulation", "Recursion with pruning", "Greedy"], ans: 1, exp: "Tabulation (bottom-up DP) fills a table iteratively from base cases up to the final answer. No recursion, no stack overhead. Often more cache-friendly and space-optimizable than memoization." },
          { q: "The Edit Distance problem between strings of length m and n has time complexity:", opts: ["O(m+n)", "O(m×n)", "O(2ᵐ)", "O(m log n)"], ans: 1, exp: "Edit Distance uses a 2D DP table: dp[i][j] = min edits to transform s1[0..i-1] to s2[0..j-1]. Recurrence: dp[i][j] = dp[i-1][j-1] if equal, else 1 + min(insert, delete, replace). O(m×n) time and space." },
          { q: "What is the optimal substructure property in the context of shortest paths?", opts: ["Longer paths cost more", "A subpath of a shortest path is itself a shortest path", "All paths have equal length", "Only direct edges matter"], ans: 1, exp: "If the shortest path from A to C goes through B, then the subpath A→B and B→C must themselves be shortest paths. This is what allows Dijkstra's, Bellman-Ford, and Floyd-Warshall to work correctly." },
        ]
      },
      binary_search: {
        title: "Binary Search & Bit Manipulation",
        questions: [
          { q: "How many comparisons does binary search make to find an element in a sorted array of 1024 elements?", opts: ["1024", "512", "10", "32"], ans: 2, exp: "Binary search makes at most ⌈log₂(1024)⌉ = 10 comparisons. Each comparison halves the search space: 1024→512→...→1 in 10 steps." },
          { q: "x & (x-1) evaluates to 0 when x is:", opts: ["Odd number", "Even number", "Power of 2", "Negative number"], ans: 2, exp: "Powers of 2 in binary have exactly one '1' bit (e.g., 8=1000). x-1 flips all bits up to and including that bit (7=0111). AND gives 0. Classic trick to check powers of 2." },
          { q: "In binary search on answer problems, what do we binary search on?", opts: ["Array index", "The answer value itself in the feasible range", "Array length", "Number of comparisons"], ans: 1, exp: "Binary search on answer: define feasible range [lo, hi] for the answer. For each mid, check validity via a predicate. Used for 'minimize the maximum' type problems." },
          { q: "What does x ^ x equal for any integer x?", opts: ["x", "2x", "0", "1"], ans: 2, exp: "XOR of a number with itself is always 0 (every bit cancels: 1^1=0, 0^0=0). Used to find the single non-duplicate in an array where all others appear twice." },
          { q: "To find the rightmost set bit of n, the expression is:", opts: ["n & (n-1)", "n | (n+1)", "n & (-n)", "n ^ (n-1)"], ans: 2, exp: "In two's complement, -n flips all bits and adds 1. n & (-n) isolates only the rightmost set bit. Example: n=12 (1100), -n=...0100, n&(-n)=0100=4." },
          { q: "What is the total number of set bits in all numbers from 1 to n efficiently computable in:", opts: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"], ans: 3, exp: "Brian Kernighan's method counts set bits in O(log n) per number. For the sum from 1 to n, use a bit-position counting approach (count contributions of each bit) in O(log n) total." },
          { q: "Binary search can be applied to find the square root of n (integer part) with complexity:", opts: ["O(n)", "O(√n)", "O(log n)", "O(n log n)"], ans: 2, exp: "Binary search on range [1, n]: find largest x where x² ≤ n. Each iteration halves the range — O(log n) total. Much faster than iterating from 1 to √n." },
          { q: "The expression (n >> k) & 1 is used to:", opts: ["Multiply n by 2^k", "Check if the k-th bit (0-indexed) of n is set", "Clear the k-th bit", "Count set bits up to k"], ans: 1, exp: "Right-shift n by k positions and AND with 1: this extracts the k-th bit. If result is 1, the bit is set; if 0, it's not. Common for bit manipulation problems." },
          { q: "Which problem can be solved by binary searching on the answer with a greedy feasibility check?", opts: ["Finding k-th smallest in matrix", "Minimum largest partition sum (painters problem)", "Counting inversions in array", "Finding median of two sorted arrays"], ans: 1, exp: "Painters problem (minimize maximum workload): binary search on answer (max allowed sum), check if k partitions suffice with that limit. Classic binary search on answer pattern." },
          { q: "To swap two integers without a temporary variable using XOR:", opts: ["a=a+b; b=a-b; a=a-b", "a=a^b; b=a^b; a=a^b", "a=a*b; b=a/b; a=a/b", "Not possible"], ans: 1, exp: "XOR swap: a^=b stores a^b in a. Then b^=a gives b^(a^b)=a. Finally a^=b gives (a^b)^a=b. Works in O(1) without extra space, but avoid when a and b point to same memory." },
        ]
      },
    },

    /* ============================================================
       DSA — ADVANCED
       GATE CSE level questions — exam name & year in explanation
    ============================================================ */
    dsa_advanced: {
      algorithms: {
        title: "Algorithm Analysis (GATE Level)",
        questions: [
          { q: "What is the number of swaps performed by selection sort to sort n elements in the worst case?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], ans: 2, exp: "Selection sort performs exactly n-1 swaps — one per pass to place the minimum element. Time: O(n²) comparisons, but only O(n) swaps. [GATE CSE 2014]" },
          { q: "Which of the following is true about NP-complete problems?", opts: ["They can be solved in polynomial time", "No known polynomial time algorithm exists, but solutions can be verified in polynomial time", "They are unsolvable", "They belong to P class"], ans: 1, exp: "NP-complete problems are in NP (solutions verifiable in poly time) and NP-hard (every NP problem reduces to them). If any NPC is in P, then P=NP. [GATE CSE 2016]" },
          { q: "The time complexity of building a heap from n elements using the standard bottom-up approach is:", opts: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], ans: 1, exp: "Bottom-up heap construction: sift down from last internal node. Most nodes are near leaves (short paths). Total work: Σ h·(n/2^h) = O(n). [GATE CSE 2013]" },
          { q: "With n keys and m buckets, expected chain length for chaining collision resolution is:", opts: ["n", "m", "n/m", "log(n)"], ans: 2, exp: "With uniform hashing, expected keys per bucket = n/m (load factor α). Search time: O(1 + α). [GATE CSE 2015]" },
          { q: "Which traversal of a BST visits nodes in non-decreasing order?", opts: ["Preorder", "Postorder", "Inorder", "Level order"], ans: 2, exp: "BST property guarantees left < root < right. Inorder (Left-Root-Right) visits in sorted ascending order. [GATE CSE 2007]" },
          { q: "The recurrence T(n) = T(n/2) + 1 solves to:", opts: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], ans: 1, exp: "By Master Theorem Case 2: a=1, b=2, f(n)=1, nˡᵒᵍᵦᵃ=n⁰=1. f(n)=Θ(1)=Θ(nˡᵒᵍᵦᵃ), so T(n)=Θ(log n). Classic binary search recurrence. [GATE CSE 2019]" },
          { q: "Which algorithm has O(V²) time on dense graphs but O(E log V) on sparse graphs?", opts: ["Kruskal's MST", "Prim's MST (with different data structures)", "Bellman-Ford", "DFS"], ans: 1, exp: "Prim's with adjacency matrix: O(V²). With binary heap + adjacency list: O(E log V). For dense graphs (E≈V²), both are comparable; sparse graphs favor heap implementation. [GATE CSE 2016]" },
          { q: "The amortized time complexity of n push and pop operations on a stack is:", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1) per operation amortized"], ans: 3, exp: "Each element is pushed once and popped at most once. Total work ≤ 2n operations for n pushes+pops. Amortized cost = O(n)/n = O(1) per operation. [GATE CSE 2014, amortized analysis]" },
          { q: "Quick Sort's expected time on a random permutation of n elements is:", opts: ["O(n²)", "O(n log n)", "O(n)", "O(n³)"], ans: 1, exp: "With random pivot, expected split is near 50/50. Expected recurrence T(n) = 2T(n/2) + O(n) → O(n log n). Exact analysis: 2n ln n. [GATE CSE 2012, Randomized Algorithms]" },
          { q: "Which of the following is NOT a comparison-based sorting algorithm?", opts: ["Merge Sort", "Heap Sort", "Counting Sort", "Quick Sort"], ans: 2, exp: "Counting Sort is a non-comparison sort — it uses element values directly as indices. Comparison sorts have Ω(n log n) lower bound; Counting Sort achieves O(n+k) by exploiting integer key range. [GATE CSE 2018]" },
        ]
      },
      graphs_advanced: {
        title: "Advanced Graphs (GATE Level)",
        questions: [
          { q: "The minimum number of edges in a connected graph with n vertices is:", opts: ["n", "n-1", "n+1", "n(n-1)/2"], ans: 1, exp: "A connected graph with exactly n-1 edges and no cycles is a tree — minimum connected structure. Fewer edges would disconnect the graph. [GATE CSE 2014, ISRO 2017]" },
          { q: "Prim's algorithm for MST using a binary heap has time complexity:", opts: ["O(V²)", "O(E log V)", "O(V log E)", "O(E + V)"], ans: 1, exp: "Prim's with binary min-heap: V extractions × log V + E decrease-key × log V = O((V+E) log V) = O(E log V) for connected graphs. [GATE CSE 2016]" },
          { q: "In a DFS of an undirected graph, all edges are either:", opts: ["Tree edges or back edges", "Tree edges or cross edges", "Forward edges or cross edges", "Back edges or forward edges"], ans: 0, exp: "In undirected graph DFS, every edge is either a tree edge (in DFS tree) or a back edge (to ancestor). Cross/forward edges don't appear in undirected DFS. [GATE CSE 2014]" },
          { q: "A strongly connected component (SCC) of a directed graph is:", opts: ["Any cycle in the graph", "A maximal set of vertices where every vertex can reach every other", "The largest connected subgraph", "Vertices with same in-degree"], ans: 1, exp: "SCC: maximal subgraph where for every pair u,v, paths u→v and v→u exist. Kosaraju's or Tarjan's finds all SCCs in O(V+E). [GATE CSE 2019]" },
          { q: "Bellman-Ford can detect negative weight cycles. How many iterations does it perform?", opts: ["V iterations", "V-1 iterations, plus one more to detect cycles", "E iterations", "log V iterations"], ans: 1, exp: "Bellman-Ford relaxes all edges V-1 times (sufficient for shortest paths). A V-th relaxation that still reduces a distance means a negative cycle exists. Total: O(VE). [GATE CSE 2012]" },
          { q: "What is the time complexity of finding the number of connected components in a graph using DFS?", opts: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"], ans: 2, exp: "Run DFS from each unvisited vertex, incrementing component count each time. Total time: O(V+E) since each vertex and edge is visited at most once. [GATE CSE 2015]" },
          { q: "In a DAG, the Single-Source Shortest Path can be solved in:", opts: ["O(V log V + E)", "O(V × E)", "O(V + E)", "O(V²)"], ans: 2, exp: "For DAGs, topological sort in O(V+E), then relax edges in topological order. Total: O(V+E). No need for Dijkstra or Bellman-Ford since there are no cycles. [GATE CSE 2018]" },
          { q: "The maximum flow in a network from source to sink equals:", opts: ["Sum of all edge capacities", "Minimum cut capacity (Max-flow Min-cut theorem)", "Number of vertices × average capacity", "Capacity of edges from source"], ans: 1, exp: "Max-flow Min-cut theorem: maximum flow = minimum cut. A cut separates source and sink; its capacity is the sum of cut edge capacities. Ford-Fulkerson computes this in O(VE²) for Edmonds-Karp. [GATE CSE 2020]" },
          { q: "Euler's formula for a connected planar graph: V - E + F = ?", opts: ["0", "1", "2", "3"], ans: 2, exp: "Euler's formula: V (vertices) - E (edges) + F (faces, including outer) = 2. For a tree (F=1), V - (V-1) + 1 = 2 ✓. Used to prove K₅ and K₃,₃ are non-planar. [GATE CSE 2017]" },
          { q: "What does it mean if DFS on a directed graph produces no back edges?", opts: ["Graph is bipartite", "Graph is a DAG (no cycles)", "Graph is complete", "All nodes are reachable from source"], ans: 1, exp: "In DFS on directed graphs, a back edge goes to an ancestor — indicating a cycle. No back edges ⇒ no cycles ⇒ the graph is a DAG. This is how DFS-based cycle detection works. [GATE CSE 2016]" },
        ]
      },
      dp_advanced: {
        title: "Advanced DP & Complexity",
        questions: [
          { q: "What is the time complexity of the optimal matrix chain multiplication algorithm?", opts: ["O(n²)", "O(n³)", "O(2ⁿ)", "O(n log n)"], ans: 1, exp: "Matrix chain multiplication DP: O(n³) time, O(n²) space. For all pairs (i,j), try every split k. dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost). [GATE CSE 2007, 2014]" },
          { q: "The O(n log n) LIS solution uses:", opts: ["Pure DP table", "Binary search on a maintained 'patience sort' array", "BFS on DAG", "Union Find"], ans: 1, exp: "O(n log n) LIS: maintain 'tails' where tails[i] = smallest tail of IS of length i+1. For each element, binary search for its position. Length of tails = LIS length. [GATE CSE 2016]" },
          { q: "Which problem is NOT solvable by DP in polynomial time?", opts: ["0/1 Knapsack (pseudo-polynomial)", "LCS", "Subset Sum", "Hamiltonian Path in general graphs"], ans: 3, exp: "Hamiltonian Path is NP-complete — no polynomial algorithm known. 0/1 Knapsack is pseudo-polynomial O(nW); Hamiltonian Path requires exponential DP (Held-Karp: O(2ⁿ·n)). [GATE CSE 2019]" },
          { q: "Edit distance (Levenshtein) between strings of length m and n has space complexity (standard DP):", opts: ["O(m+n)", "O(m×n)", "O(max(m,n))", "O(1)"], ans: 1, exp: "Standard Edit Distance uses (m+1)×(n+1) 2D DP table. Can be optimized to O(min(m,n)) space by only keeping two rows. [GATE CSE 2015]" },
          { q: "The master theorem: T(n) = aT(n/b) + f(n). If f(n) = O(nˡᵒᵍᵦᵃ⁻ᵉ), the solution is:", opts: ["T(n) = Θ(f(n))", "T(n) = Θ(nˡᵒᵍᵦᵃ log n)", "T(n) = Θ(nˡᵒᵍᵦᵃ)", "Not determinable"], ans: 2, exp: "Master Theorem Case 1: if f(n) is polynomially smaller than nˡᵒᵍᵦᵃ, recursive work dominates and T(n) = Θ(nˡᵒᵍᵦᵃ). [GATE CSE 2017]" },
          { q: "The Held-Karp algorithm for TSP has time complexity:", opts: ["O(n!)", "O(2ⁿ × n²)", "O(n³)", "O(2ⁿ × n)"], ans: 3, exp: "Held-Karp DP for TSP: states = (current city, set of visited cities). States: O(n × 2ⁿ). Transitions: O(n). Total: O(2ⁿ × n²). Better than O(n!) brute force but still exponential. [GATE CSE competitive exam]" },
          { q: "The DP recurrence for Egg Drop (n floors, k eggs): what characterizes the optimal subproblem?", opts: ["Floors remaining after each drop", "Either the egg breaks (check below) or it doesn't (check above)", "Total number of eggs used so far", "Floor number where we always drop"], ans: 1, exp: "Egg Drop DP: drop from floor x with k eggs. If egg breaks: k-1 eggs, x-1 floors below. If not: k eggs, n-x floors above. dp[n][k] = 1 + min over x of max(dp[x-1][k-1], dp[n-x][k]). [GATE CSE 2014]" },
          { q: "Interval DP is used to solve problems involving:", opts: ["Linear arrays only", "Merging or splitting intervals optimally (e.g., matrix chain, burst balloons)", "2D grid traversal", "Graph shortest paths"], ans: 1, exp: "Interval DP solves problems where we consider all intervals [i,j] and split them optimally. Examples: Matrix Chain Multiplication, Burst Balloons, Palindrome Partitioning. dp[i][j] depends on dp[i][k] and dp[k+1][j]. [GATE CSE competitive exams]" },
          { q: "The space-optimized version of 0/1 Knapsack reduces space from O(nW) to:", opts: ["O(n)", "O(W)", "O(log W)", "O(n + W)"], ans: 1, exp: "By iterating backward through capacities in a 1D dp[W+1] array (instead of 2D dp[n][W]), space reduces from O(nW) to O(W). The backward iteration prevents using an item twice. [Standard algorithm optimization, GATE prep]" },
          { q: "Which problem has a DP solution with state dp[i][j] = number of ways to make amount j using first i coin types?", opts: ["0/1 Knapsack", "Unbounded Coin Change (count ways)", "Longest Palindromic Subsequence", "Edit Distance"], ans: 1, exp: "Coin Change (count combinations): dp[i][j] = dp[i-1][j] (don't use coin i) + dp[i][j - coins[i-1]] (use coin i). Unbounded since we can reuse coins. [GATE CSE, interview standard problem]" },
        ]
      },
    },

    /* ============================================================
       WEB DEV — BEGINNER
       Conceptual web fundamentals — slightly tricky
    ============================================================ */
    web_beginner: {
      html_css: {
        title: "HTML & CSS Fundamentals",
        questions: [
          { q: "Which HTML tag is used for the largest heading?", opts: ["<h6>", "<header>", "<h1>", "<title>"], ans: 2, exp: "<h1> is the largest heading. Good practice: use only one <h1> per page for SEO and accessibility. Headings go from <h1> (largest) to <h6> (smallest)." },
          { q: "In CSS, which property controls the space between the content and the border?", opts: ["margin", "padding", "border-spacing", "gap"], ans: 1, exp: "Padding is inside the element between content and border. Margin is outside the border. CSS Box Model: content → padding → border → margin." },
          { q: "What does 'display: flex' do to an element?", opts: ["Makes it invisible", "Turns it into a flex container enabling Flexbox layout for its children", "Makes it a grid", "Centers it on the page"], ans: 1, exp: "display:flex makes direct children flex items. Control layout with flex-direction, justify-content, align-items, etc. Flexbox is ideal for 1D layouts (row or column)." },
          { q: "Which CSS selector has the highest specificity?", opts: ["Element selector (div)", "Class selector (.box)", "ID selector (#main)", "Universal selector (*)"], ans: 2, exp: "Specificity order: !important > inline style > ID (#) > class/attribute/pseudo-class (.) > element > universal (*). ID selectors have very high specificity." },
          { q: "What is the correct HTML to make a hyperlink open in a new tab?", opts: ["<a href='url' new>", "<a href='url' target='_blank'>", "<a href='url' open='new'>", "<link href='url' new>"], ans: 1, exp: "target='_blank' opens the link in a new tab. Also add rel='noopener noreferrer' to prevent the new tab from accessing the opener via window.opener (security best practice)." },
          { q: "In the CSS Box Model, what does 'box-sizing: border-box' do?", opts: ["Removes all padding", "Makes width/height include padding and border, not just content", "Adds a border to all elements", "Makes margin part of the element size"], ans: 1, exp: "With box-sizing:border-box, the element's total width includes padding and border — making layout math much simpler. Default is content-box where padding/border add to the declared width." },
          { q: "What is the difference between 'position: absolute' and 'position: relative'?", opts: ["No difference", "Absolute removes the element from flow, positioned relative to nearest positioned ancestor; relative keeps it in flow and offsets from its normal position", "Relative removes it from flow", "Absolute is used for sticky headers"], ans: 1, exp: "position:relative offsets from the element's normal position while keeping it in document flow. position:absolute removes it from flow and positions it relative to the nearest ancestor with position != static." },
          { q: "Which CSS unit is relative to the font size of the root element?", opts: ["em", "rem", "vh", "%"], ans: 1, exp: "rem (root em) is relative to the font-size of the <html> element. em is relative to the current element's font-size (compounding). rem is more predictable for consistent sizing across components." },
          { q: "What does the 'alt' attribute in <img> provide?", opts: ["Image title on hover", "Alternative text for accessibility and when image fails to load", "Image size hint", "CSS class for the image"], ans: 1, exp: "alt text is read by screen readers for accessibility and displayed when the image fails to load. It's also used by search engines. Always include descriptive alt text for meaningful images; use alt='' for decorative images." },
          { q: "CSS Grid vs Flexbox: which is better for a complex 2D layout (rows AND columns)?", opts: ["Flexbox — it handles both dimensions", "CSS Grid — designed for 2D layouts with both rows and columns simultaneously", "Both are identical", "Tables are better for 2D layouts"], ans: 1, exp: "CSS Grid is designed for 2D layouts — you control both rows and columns simultaneously. Flexbox is 1D (either row or column at a time). For a card grid or magazine layout, CSS Grid is the right choice." },
        ]
      },
      javascript: {
        title: "JavaScript Fundamentals",
        questions: [
          { q: "What is the output of: console.log(typeof null)?", opts: ["'null'", "'undefined'", "'object'", "'boolean'"], ans: 2, exp: "typeof null returns 'object' — a famous JavaScript bug from 1995 never fixed for backward compatibility. Use === null to check for null specifically." },
          { q: "Which method adds an element to the END of an array?", opts: ["unshift()", "push()", "concat()", "splice()"], ans: 1, exp: "push() adds one or more elements to the end and returns new length. unshift() adds to beginning. splice() inserts/removes at any position. concat() creates a new array." },
          { q: "What is the difference between == and === in JavaScript?", opts: ["No difference", "=== checks value and type; == only checks value with type coercion", "== checks type; === checks value", "=== is used for objects only"], ans: 1, exp: "== performs type coercion (0 == '0' is true). === requires both value AND type to match (0 === '0' is false). Always prefer === to avoid unexpected coercion bugs." },
          { q: "What does 'const' prevent in JavaScript?", opts: ["Changing object properties", "Reassigning the variable binding", "Using before declaration", "All of the above"], ans: 1, exp: "const prevents reassignment of the binding. However, object/array properties CAN be mutated (const obj = {}; obj.x = 1 is valid). Use Object.freeze() for true immutability." },
          { q: "What is a closure in JavaScript?", opts: ["A way to close the browser", "A function that retains access to variables from its outer scope even after the outer function returns", "A method to clear memory", "An arrow function"], ans: 1, exp: "A closure captures variables from its enclosing scope. Even after the outer function finishes, the inner function retains access to those variables. Powers callbacks, event handlers, and data privacy." },
          { q: "What is the output of: console.log(0.1 + 0.2 === 0.3)?", opts: ["true", "false", "undefined", "Error"], ans: 1, exp: "This prints false! Due to floating-point representation (IEEE 754), 0.1 + 0.2 = 0.30000000000000004, not exactly 0.3. Compare floats with a tolerance: Math.abs(a - b) < Number.EPSILON." },
          { q: "What does Array.prototype.map() return?", opts: ["Modified original array", "A new array with each element transformed by the callback", "undefined", "The length of the original array"], ans: 1, exp: "map() creates a NEW array with results of calling the callback on each element. It does NOT modify the original array. Contrast with forEach() which returns undefined and is used for side effects only." },
          { q: "What is 'hoisting' in JavaScript?", opts: ["Moving CSS styles to top", "Variable/function declarations being processed before code execution begins", "Importing modules at runtime", "Making code run in parallel"], ans: 1, exp: "Hoisting: function declarations and var declarations are moved to the top of their scope during compilation. Function declarations are fully hoisted (callable before declaration). var is hoisted but initialized as undefined." },
          { q: "What does the 'this' keyword refer to inside an arrow function?", opts: ["The arrow function itself", "The window/global object always", "The 'this' of the enclosing lexical scope (not its own)", "The calling object"], ans: 2, exp: "Arrow functions don't have their own 'this'. They inherit 'this' from the surrounding lexical scope. This is why arrow functions are commonly used in callbacks to preserve the outer 'this' context." },
          { q: "What is the purpose of 'Promise.all()'?", opts: ["Executes promises sequentially", "Waits for ALL promises to resolve (or rejects if any rejects), returns array of results", "Races promises and returns the first", "Catches errors from any promise"], ans: 1, exp: "Promise.all([p1, p2, p3]) waits for all to resolve and returns [result1, result2, result3]. If ANY rejects, Promise.all immediately rejects. Use Promise.allSettled() if you need all results regardless of rejection." },
        ]
      },
      dom: {
        title: "DOM & Browser APIs",
        questions: [
          { q: "Which method selects the FIRST element matching a CSS selector?", opts: ["getElementById()", "querySelector()", "querySelectorAll()", "getElementsByClass()"], ans: 1, exp: "querySelector(selector) returns the first matching element or null. querySelectorAll() returns ALL matches as NodeList. querySelector is more flexible as it accepts any CSS selector." },
          { q: "What does event.preventDefault() do?", opts: ["Stops event propagation", "Stops the default browser action for that event", "Removes the event listener", "Cancels all events"], ans: 1, exp: "preventDefault() stops the browser's default handling (e.g., preventing form submission, link navigation). It does NOT stop propagation — use stopPropagation() separately for that." },
          { q: "What is event bubbling?", opts: ["Creating multiple events", "An event on a child propagating up to parent elements", "Events that run on page load", "Memory leak from events"], ans: 1, exp: "After firing on target, events 'bubble up' through ancestors (child → parent → grandparent → document). Most DOM events bubble. Use stopPropagation() to prevent bubbling." },
          { q: "localStorage stores data as:", opts: ["JSON objects", "Key-value pairs with string values", "Binary data", "Session-only cookies"], ans: 1, exp: "localStorage stores string key-value pairs. Use JSON.stringify() to save objects and JSON.parse() to read them. Data persists until explicitly cleared, unlike sessionStorage." },
          { q: "Which method creates a new HTML element in JavaScript?", opts: ["document.newElement()", "document.createElement()", "document.addElement()", "new HTMLElement()"], ans: 1, exp: "document.createElement(tagName) creates a new DOM element not yet in the document. Append with parent.appendChild(element) or parent.append(element) to add it to the DOM." },
          { q: "What is event delegation?", opts: ["Removing event listeners after use", "Adding a listener to a parent and letting events bubble up from children", "Creating custom events", "Throttling event handlers"], ans: 1, exp: "Event delegation: attach ONE listener to a parent. Events from children bubble up. Check event.target to identify which child triggered it. More efficient than adding listeners to every child, especially dynamic lists." },
          { q: "What does 'DOMContentLoaded' event fire when?", opts: ["After all images and styles load", "After the HTML is fully parsed (before images/styles finish loading)", "Before any HTML is parsed", "When the user scrolls"], ans: 1, exp: "DOMContentLoaded fires when HTML parsing is complete and DOM is ready, without waiting for images/stylesheets. Use this over window 'load' for faster script initialization when you only need the DOM." },
          { q: "What is the difference between innerHTML and textContent?", opts: ["No difference", "innerHTML parses HTML; textContent sets/gets raw text without parsing HTML", "textContent only works on input elements", "innerHTML is faster"], ans: 1, exp: "innerHTML parses HTML strings (XSS risk if user content). textContent treats content as plain text — faster, safer for user-provided content. innerText is similar to textContent but is layout-aware (respects CSS visibility)." },
          { q: "The fetch() API returns:", opts: ["Data directly", "A Promise that resolves to a Response object", "An XMLHttpRequest object", "JSON directly"], ans: 1, exp: "fetch() returns a Promise resolving to a Response. Call response.json() (also returns a Promise) to parse JSON. Pattern: fetch(url).then(r => r.json()).then(data => ...). Or use async/await." },
          { q: "What does the 'defer' attribute do on a <script> tag?", opts: ["Loads script immediately blocking HTML parsing", "Downloads script in parallel, executes after HTML parsing is complete, in order", "Makes the script optional", "Delays script by 1 second"], ans: 1, exp: "defer: script downloads in parallel (non-blocking) and executes after DOM is parsed, in order of appearance. Unlike async which executes as soon as loaded (may be out of order). Best for most scripts." },
        ]
      },
    },

    /* ============================================================
       WEB DEV — INTERMEDIATE
       Framework & architecture level
    ============================================================ */
    web_intermediate: {
      react: {
        title: "React & Component Design",
        questions: [
          { q: "When does React re-render a component?", opts: ["Only on page refresh", "When state or props change, or when parent re-renders", "Only when setState is called directly", "Every 16ms"], ans: 1, exp: "React re-renders when: state changes, props change, parent re-renders (even with same props unless React.memo), or context value changes. Use React.memo and useMemo to optimize." },
          { q: "What is the purpose of the useEffect dependency array?", opts: ["To list props the component needs", "To control when the effect re-runs — runs when any dependency changes", "To declare state variables", "To import modules"], ans: 1, exp: "useEffect(fn, [deps]): runs fn after render when deps change. Empty [] → runs once on mount. No array → runs every render. Specific deps → runs when those change." },
          { q: "What problem does useCallback solve?", opts: ["Memory leaks", "Prevents function recreation each render, stabilizing references for child component props", "Makes functions async", "Caches API results"], ans: 1, exp: "On every render, functions are recreated. If passed to a child wrapped in React.memo, new reference causes re-renders. useCallback(fn, deps) memoizes the function reference until deps change." },
          { q: "What is 'lifting state up' in React?", opts: ["Using Redux for all state", "Moving state to a common ancestor so multiple children can share it", "Using context for all state", "Server-side state management"], ans: 1, exp: "When sibling components need shared state, 'lift' it to their nearest common parent. Parent holds state and passes it down via props — the core React state-sharing pattern." },
          { q: "React keys in lists are required to:", opts: ["Style list items", "Help React identify which items changed, added, or removed for efficient DOM diffing", "Make items clickable", "Sort the list"], ans: 1, exp: "Keys help React's reconciliation match components across renders. Without stable keys, React may re-render all items on change. Use unique identifiers, not array indices (unstable on reorder)." },
          { q: "What is the difference between controlled and uncontrolled components?", opts: ["No real difference", "Controlled: React state controls the value; Uncontrolled: DOM manages the value via ref", "Uncontrolled is always better for performance", "Controlled only works with class components"], ans: 1, exp: "Controlled: form value stored in React state (value + onChange). Uncontrolled: DOM manages value, accessed via useRef. Controlled is more predictable; uncontrolled is simpler for file inputs or non-critical forms." },
          { q: "What does React.memo do?", opts: ["Memoizes expensive computations", "Wraps a functional component to prevent re-renders if props are shallowly equal", "Caches API responses", "Memoizes event handlers"], ans: 1, exp: "React.memo wraps a component: if parent re-renders but props haven't shallowly changed, the child skips re-rendering. Pair with useCallback to stabilize function props." },
          { q: "What is the Context API used for?", opts: ["Making HTTP requests", "Sharing state across the component tree without prop drilling", "Managing global server state", "Routing between pages"], ans: 1, exp: "Context avoids prop drilling by providing a way to share values (theme, auth, locale) to any nested component without manually passing props at every level. Not a replacement for proper state management at scale." },
          { q: "What is the Strict Mode in React?", opts: ["Production-only build mode", "A development tool that double-invokes certain lifecycle methods to surface side effects", "Enforces TypeScript types", "Prevents all mutations"], ans: 1, exp: "React.StrictMode double-invokes render, constructor, and some hooks in development to help detect unexpected side effects. It doesn't affect production. Helps identify components that rely on impure rendering." },
          { q: "useMemo vs useCallback: what's the key difference?", opts: ["No difference", "useMemo memoizes a computed value; useCallback memoizes a function reference", "useCallback is for class components", "useMemo is for API calls"], ans: 1, exp: "useMemo(fn, deps) returns the memoized result of calling fn. useCallback(fn, deps) returns the memoized function reference itself. useMemo = cache the result; useCallback = cache the function." },
        ]
      },
      backend: {
        title: "Node.js & REST APIs",
        questions: [
          { q: "What does Express middleware do?", opts: ["Only handles errors", "Functions that execute in request-response cycle with access to req, res, and next()", "Only parses JSON", "Only serves static files"], ans: 1, exp: "Middleware in Express receive (req, res, next). Can modify req/res, execute code, end the cycle, or call next() to pass to the next middleware. Ordered by registration — use app.use() for global middleware." },
          { q: "Which HTTP method should be used to partially update a resource?", opts: ["POST", "PUT", "PATCH", "DELETE"], ans: 2, exp: "PATCH for partial updates (send only changed fields). PUT for complete replacement (send entire resource). POST for creating new resources. Following REST conventions makes APIs predictable." },
          { q: "What is the purpose of JWT (JSON Web Token)?", opts: ["Encrypt passwords", "Stateless authentication — encode user claims in a signed token sent with each request", "Store session data server-side", "Hash database queries"], ans: 1, exp: "JWT encodes claims (user id, roles) in a base64 token signed with a secret. Server verifies signature without DB lookup — stateless. Structure: header.payload.signature. Store in httpOnly cookie for security." },
          { q: "What does CORS stand for and when is it relevant?", opts: ["Content Origin Resource Sharing — always needed", "Cross-Origin Resource Sharing — when frontend and backend are on different origins", "Client Object Request System", "Content-Only Response Schema"], ans: 1, exp: "CORS is a browser security mechanism. When frontend (localhost:3000) calls backend (localhost:5000), the browser enforces CORS. Server must send Access-Control-Allow-Origin headers to permit cross-origin requests." },
          { q: "What is the Node.js event loop responsible for?", opts: ["Running multiple threads", "Handling async operations (I/O, timers) while keeping the main thread non-blocking", "Garbage collection", "Compiling JavaScript"], ans: 1, exp: "Node.js is single-threaded. The event loop enables non-blocking I/O by deferring operations (file read, HTTP) to the OS. When complete, callbacks are queued and executed. This is why Node excels at I/O-bound workloads." },
          { q: "What HTTP status code indicates a resource was successfully created?", opts: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"], ans: 1, exp: "201 Created: server created a new resource (typically in response to POST). 200 OK: successful request with response body. 204 No Content: success but no response body (common for DELETE or PATCH)." },
          { q: "What is the difference between SQL and NoSQL databases?", opts: ["SQL is newer", "SQL uses structured relational tables with schema; NoSQL is schema-flexible (documents, key-value, graph)", "NoSQL can't store relationships", "SQL is only for small datasets"], ans: 1, exp: "SQL (MySQL, PostgreSQL): structured tables, ACID transactions, powerful joins. NoSQL (MongoDB, Redis): flexible schema, horizontal scaling, optimized for specific data models. Choose based on data structure and scale needs." },
          { q: "What is rate limiting in APIs?", opts: ["Slowing down the server intentionally", "Restricting how many requests a client can make in a time window to prevent abuse", "Limiting response body size", "Caching API responses"], ans: 1, exp: "Rate limiting (e.g., 100 req/min per IP) prevents abuse, DDoS, and ensures fair use. Implement with tools like express-rate-limit. Return 429 Too Many Requests when limit is exceeded." },
          { q: "What does 'idempotent' mean in REST API design?", opts: ["The endpoint returns HTML", "Making the same request multiple times produces the same result", "The endpoint requires authentication", "The request has no body"], ans: 1, exp: "Idempotent: calling the same endpoint N times = calling it once (result is the same). GET, PUT, DELETE are idempotent. POST is NOT — calling it N times creates N resources. Important for safe retry logic." },
          { q: "What is middleware chaining in Express?", opts: ["Running multiple servers", "Multiple middleware functions executed in sequence for a single route, each calling next()", "Connecting to multiple databases", "Caching route responses"], ans: 1, exp: "Middleware chain: request passes through each middleware in registration order. Each calls next() to proceed or ends the response. Order matters — authentication middleware should run before route handlers." },
        ]
      },
      performance: {
        title: "Performance & Web Security",
        questions: [
          { q: "What does XSS (Cross-Site Scripting) allow an attacker to do?", opts: ["Access server filesystem", "Inject malicious scripts into web pages viewed by other users", "Bypass server authentication directly", "Steal database credentials"], ans: 1, exp: "XSS: attacker injects malicious scripts (via user input) into pages served to victims. Scripts run in victim's browser, stealing cookies/tokens or hijacking sessions. Prevent: sanitize input, use Content-Security-Policy headers, never use innerHTML with user data." },
          { q: "What is CSRF (Cross-Site Request Forgery)?", opts: ["SQL injection variant", "Tricking an authenticated user into unknowingly submitting malicious requests to a web app", "Stealing cookies via JavaScript", "Man-in-the-middle attack"], ans: 1, exp: "CSRF: malicious site tricks user's browser to send authenticated requests to your app (e.g., transfer funds). Prevent with CSRF tokens (unique secret per session, verified server-side) or SameSite cookie attribute." },
          { q: "What is lazy loading in web performance?", opts: ["Loading resources only when needed (e.g., images when they enter the viewport)", "Using a slow CDN", "Deferring JavaScript parsing", "Compressing CSS files"], ans: 0, exp: "Lazy loading defers loading off-screen resources until they're needed. For images: use loading='lazy' attribute. For code: use dynamic import(). Reduces initial page load time and bandwidth usage significantly." },
          { q: "What does 'debouncing' a function do?", opts: ["Makes it run faster", "Delays execution until a certain time has passed since the last call", "Runs it multiple times per second", "Prevents it from running at all"], ans: 1, exp: "Debouncing: execute function only after N milliseconds of inactivity. Perfect for search input — only fire API call after user stops typing for 300ms, not on every keystroke. Reduces unnecessary function calls." },
          { q: "What is the purpose of Content Security Policy (CSP)?", opts: ["Speed up page loads", "Restrict which resources the browser can load, mitigating XSS and injection attacks", "Enable CORS", "Compress HTTP responses"], ans: 1, exp: "CSP header tells browsers which sources are trusted for scripts, styles, images, etc. Prevents XSS by blocking injected scripts not from trusted origins. Example: Content-Security-Policy: script-src 'self' https://trusted.com" },
          { q: "What is memoization in the context of frontend performance?", opts: ["Storing browser history", "Caching function results so identical calls return the cached result without recomputation", "Lazy loading images", "Minifying JavaScript"], ans: 1, exp: "Memoization caches function results keyed by inputs. In React, useMemo() memoizes expensive computations. In general JS, wrap pure functions with a memoize helper. Trades memory for computation speed." },
          { q: "HTTP/2 improves over HTTP/1.1 primarily by:", opts: ["Using UDP instead of TCP", "Multiplexing multiple requests over a single connection (no head-of-line blocking)", "Removing the need for HTTPS", "Compressing DNS lookups"], ans: 1, exp: "HTTP/2 allows multiple requests/responses to be interleaved on one connection (multiplexing). HTTP/1.1 can only handle one request at a time per connection, leading to head-of-line blocking. Also adds header compression and server push." },
          { q: "What does a CDN (Content Delivery Network) do?", opts: ["Stores backend databases globally", "Distributes static assets across geographically distributed servers, reducing latency", "Compresses server-side code", "Manages DNS records only"], ans: 1, exp: "CDN serves static assets (JS, CSS, images) from edge servers close to users. Reduces latency by serving from nearby location instead of origin server. Also absorbs DDoS traffic and improves availability." },
          { q: "What is the Critical Rendering Path?", opts: ["The fastest JavaScript execution path", "The sequence of steps the browser takes to convert HTML/CSS/JS into pixels on screen", "The order CSS rules are applied", "The order JavaScript files load"], ans: 1, exp: "CRP: HTML parse → DOM, CSS parse → CSSOM, combine → Render Tree, Layout, Paint. Blocking JS and CSS delays CRP. Optimize by deferring non-critical JS, inlining critical CSS, and minimizing render-blocking resources." },
          { q: "What does SQL injection exploit?", opts: ["Weak passwords", "Unsanitized user input being interpreted as SQL code", "Unencrypted database connections", "Server misconfiguration"], ans: 1, exp: "SQL injection: malicious SQL in user input (e.g., ' OR '1'='1) is executed by the database. Prevent with parameterized queries / prepared statements — never concatenate user input into SQL strings. Affects any database if unprotected." },
        ]
      },
    },

    /* ============================================================
       WEB DEV — ADVANCED
       Architecture & professional engineering
    ============================================================ */
    web_advanced: {
      architecture: {
        title: "Frontend Architecture",
        questions: [
          { q: "What is the main advantage of a micro-frontend architecture?", opts: ["Smaller bundle sizes always", "Independent deployability and team autonomy — each team owns and deploys their frontend slice", "Better CSS specificity", "Faster rendering than monolith"], ans: 1, exp: "Micro-frontends extend microservice principles to frontend. Teams independently develop, test, and deploy their slices. Allows different tech stacks per team. Challenges: shared dependencies, consistent UX, increased infrastructure complexity." },
          { q: "What problem does a state management library (Redux, Zustand) solve?", opts: ["API caching", "Predictable global state sharing without prop drilling or complex component hierarchies", "Server-side rendering", "CSS conflicts"], ans: 1, exp: "State management libraries provide a predictable central store. Redux uses strict unidirectional data flow (action → reducer → store → view). Zustand is simpler with less boilerplate. Avoid overusing — React state + Context suffice for many apps." },
          { q: "What is code splitting in the context of bundlers like Webpack/Vite?", opts: ["Writing modular code", "Breaking the bundle into chunks that are loaded on demand, reducing initial load size", "Splitting CSS from JavaScript", "Separating dev and prod code"], ans: 1, exp: "Code splitting: instead of one large bundle, split into chunks loaded when needed (dynamic import()). React.lazy + Suspense enables route-based or component-based splitting. Dramatically reduces initial bundle size and time-to-interactive." },
          { q: "Server-Side Rendering (SSR) vs Client-Side Rendering (CSR): key tradeoff?", opts: ["SSR is always faster", "SSR sends pre-rendered HTML (better FCP, SEO); CSR sends minimal HTML, renders in browser (better interactivity after load)", "CSR is better for SEO", "SSR doesn't use JavaScript"], ans: 1, exp: "SSR (Next.js getServerSideProps): server renders HTML per request — better First Contentful Paint and SEO. CSR: minimal HTML, React builds DOM in browser — good for SPAs with authenticated data. Hybrid (ISR, streaming SSR) is the modern approach." },
          { q: "What is a 'design token' in frontend architecture?", opts: ["A JWT for designers", "Named values for design decisions (colors, spacing, typography) shared across design and code", "A CSS utility class system", "A component prop type"], ans: 1, exp: "Design tokens are named variables (e.g., color-primary: #7400b8) that represent design decisions. Shared between design tools (Figma) and code (CSS variables, JS constants). Enable consistent design at scale and easy theme switching." },
          { q: "What is the purpose of a module federation in Webpack 5?", opts: ["Splitting CSS into modules", "Sharing JavaScript modules between separate builds at runtime, enabling true micro-frontends", "Lazy loading route components", "Bundling node_modules separately"], ans: 1, exp: "Module Federation: multiple independently built/deployed apps can share modules (components, utils) at runtime — no recompilation. App A can consume a React component from App B. Foundational for micro-frontend architectures." },
          { q: "What is the 'Islands Architecture' pattern in web development?", opts: ["Breaking app into separate domains", "Static HTML pages with isolated 'islands' of interactivity (client-side JS only where needed)", "Microservice API design", "CSS grid column pattern"], ans: 1, exp: "Islands Architecture (Astro, Marko): render mostly static HTML, hydrate only specific interactive components ('islands'). Reduces JS shipped and improves performance. Middle ground between full SSR and full CSR." },
          { q: "What is tree shaking in modern bundlers?", opts: ["Removing unused CSS", "Eliminating dead/unused JavaScript code from the final bundle via static analysis", "Optimizing image assets", "Splitting vendor chunks"], ans: 1, exp: "Tree shaking: bundlers statically analyze import/export statements and eliminate unused exports. Requires ES modules (not CommonJS). Ensures only code actually used is bundled. Crucial for keeping library bundles small." },
          { q: "What is the purpose of a BFF (Backend for Frontend)?", opts: ["A special testing framework", "A dedicated API layer that aggregates and tailors backend services specifically for frontend needs", "A build tool for frontend", "A browser extension API"], ans: 1, exp: "BFF pattern: instead of frontend calling multiple microservices, a dedicated BFF aggregates, transforms, and caches data tailored for the frontend's needs. Reduces round trips, protects internal services, enables frontend-driven API design." },
          { q: "What is Storybook used for in frontend development?", opts: ["End-to-end testing", "Developing, documenting, and visually testing UI components in isolation", "Managing project dependencies", "Deploying frontend applications"], ans: 1, exp: "Storybook: isolated component development environment. Define 'stories' representing component states. Enables developing UI without running the full app, visual regression testing, and serving as living documentation." },
        ]
      },
      typescript: {
        title: "TypeScript & Advanced Types",
        questions: [
          { q: "What is the difference between 'interface' and 'type' in TypeScript?", opts: ["No difference", "Interface is for objects/classes and is extendable via declaration merging; type is more flexible (unions, tuples, mapped types)", "Type is only for primitives", "Interface is deprecated"], ans: 1, exp: "Both define types but differ: interfaces support declaration merging (multiple declarations merge), extend via extends/implements. type aliases support unions (A | B), intersections (A & B), mapped types, conditionals. Prefer interface for objects, type for complex compositions." },
          { q: "What does the TypeScript 'keyof' operator do?", opts: ["Lists all keys in an array", "Produces a union type of all property keys of a given type", "Deletes a key from an object type", "Checks if a key exists at runtime"], ans: 1, exp: "keyof T produces a union of all property names of T. Example: keyof {a: string, b: number} = 'a' | 'b'. Used for type-safe property access: function getProp<T, K extends keyof T>(obj: T, key: K): T[K]" },
          { q: "What is a TypeScript 'generic' used for?", opts: ["Performance optimization", "Creating reusable components that work with multiple types while maintaining type safety", "Runtime type checking", "Defining enum values"], ans: 1, exp: "Generics allow type parameters: function identity<T>(arg: T): T. The function works for any type while preserving type information throughout. Avoids using any (which loses type safety). Core to TypeScript's utility types (Partial<T>, Pick<T,K>, etc.)." },
          { q: "What does 'Partial<T>' do in TypeScript?", opts: ["Makes all properties required", "Makes all properties of T optional", "Removes all properties of T", "Makes T readonly"], ans: 1, exp: "Partial<T> creates a type with all properties of T set to optional (?). Useful for update functions where you only pass changed fields. Example: Partial<User> = {name?: string, email?: string, ...}." },
          { q: "What is a discriminated union in TypeScript?", opts: ["A union of primitive types only", "A union of types sharing a common literal property ('tag') that TypeScript uses to narrow types", "A union that only allows one type at runtime", "A union of interface types"], ans: 1, exp: "Discriminated union: union of types with a shared 'discriminant' property (literal type). Example: {type: 'circle', radius: number} | {type: 'square', side: number}. TypeScript narrows type based on the discriminant, enabling exhaustive type checking." },
          { q: "What is the 'never' type in TypeScript?", opts: ["A type that has no value (unreachable code, exhaustive checks)", "The same as void", "A type for null values", "An error type"], ans: 0, exp: "never represents values that never occur. Functions that throw always or loop forever return never. In exhaustive switches, the default case should have type never — if a new union member is added but not handled, TypeScript errors. Crucial for type-safe exhaustive checks." },
          { q: "What does the TypeScript 'as const' assertion do?", opts: ["Makes all properties any type", "Infers the most specific (literal) types and makes values readonly", "Converts to a constant string", "Disables type checking"], ans: 1, exp: "as const: [1, 2, 3] as const → readonly [1, 2, 3] with literal types. {status: 'active'} as const → {readonly status: 'active'}. Enables using object values as literal types, useful for action type constants in reducers." },
          { q: "What is 'declaration merging' for TypeScript interfaces?", opts: ["Combining two .ts files", "Multiple interface declarations with the same name are automatically merged into one", "Merging TypeScript and JavaScript files", "Combining type and interface declarations"], ans: 1, exp: "Declaration merging: if you declare the same interface name twice, TypeScript merges them. Useful for extending third-party types (augmenting module interfaces). type aliases cannot be merged — re-declaring them is an error." },
          { q: "What does the 'infer' keyword do in TypeScript conditional types?", opts: ["Forces type inference", "Captures a type variable within a conditional type for later use", "Converts any to unknown", "Imports a type from a module"], ans: 1, exp: "infer in conditional types: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never. When the condition matches, TypeScript 'captures' the matched type into R. Powers utility types like ReturnType, Parameters, InstanceType." },
          { q: "What is the difference between 'unknown' and 'any' in TypeScript?", opts: ["No difference", "unknown requires type narrowing before use; any bypasses type checking entirely", "any is stricter than unknown", "unknown is only for async code"], ans: 1, exp: "any: opts out of type checking — you can do anything with it. unknown: type-safe top type — you must narrow it (typeof, instanceof, assertion) before operating on it. Prefer unknown over any for better type safety when the type is truly uncertain." },
        ]
      },
    },

  };

  /* ============================================
     TOPIC METADATA
  ============================================ */
  const topicMeta = {
    dsa_beginner: {
      arrays:       { title: "Arrays & Strings",       subject: "DSA", level: "Beginner" },
      sorting:      { title: "Sorting & Searching",     subject: "DSA", level: "Beginner" },
      linked_lists: { title: "Linked Lists",            subject: "DSA", level: "Beginner" },
      stacks_queues:{ title: "Stacks & Queues",         subject: "DSA", level: "Beginner" },
      recursion:    { title: "Recursion Basics",        subject: "DSA", level: "Beginner" },
    },
    dsa_intermediate: {
      arrays:       { title: "Advanced Arrays & Hashing", subject: "DSA", level: "Intermediate" },
      trees:        { title: "Trees & BST",               subject: "DSA", level: "Intermediate" },
      graphs:       { title: "Graph Algorithms",          subject: "DSA", level: "Intermediate" },
      dp:           { title: "Dynamic Programming",       subject: "DSA", level: "Intermediate" },
      binary_search:{ title: "Binary Search & Bits",      subject: "DSA", level: "Intermediate" },
    },
    dsa_advanced: {
      algorithms:       { title: "Algorithm Analysis",       subject: "DSA", level: "Expert (GATE)" },
      graphs_advanced:  { title: "Advanced Graphs",          subject: "DSA", level: "Expert (GATE)" },
      dp_advanced:      { title: "Advanced DP & Complexity", subject: "DSA", level: "Expert (GATE)" },
    },
    web_beginner: {
      html_css:   { title: "HTML & CSS Fundamentals", subject: "Web Dev", level: "Beginner" },
      javascript: { title: "JavaScript Basics",       subject: "Web Dev", level: "Beginner" },
      dom:        { title: "DOM & Browser APIs",      subject: "Web Dev", level: "Beginner" },
    },
    web_intermediate: {
      react:       { title: "React & Components",     subject: "Web Dev", level: "Intermediate" },
      backend:     { title: "Node.js & REST APIs",    subject: "Web Dev", level: "Intermediate" },
      performance: { title: "Performance & Security", subject: "Web Dev", level: "Intermediate" },
    },
    web_advanced: {
      architecture: { title: "Frontend Architecture", subject: "Web Dev", level: "Advanced" },
      typescript:   { title: "TypeScript & Types",    subject: "Web Dev", level: "Advanced" },
    },
  };

  /* ============================================
     QUIZ DATA SELECTION
  ============================================ */
  const bankKey = `${subject}_${level}`;
  const topicData = QUESTION_BANK[bankKey]?.[topicSlug];
  const meta = topicMeta[bankKey]?.[topicSlug];

  let quizData = [];
  if (topicData && topicData.questions.length >= 10) {
    quizData = topicData.questions.slice(0, 10); // enforce exactly 10
  } else if (topicData) {
    quizData = topicData.questions; // show what exists (edge case)
  } else {
    quizData = getDefaultQuestions();
  }

  /* ============================================
     RENDER QUIZ TITLE & META
  ============================================ */
  const titleEl = document.querySelector(".quiz-title");
  if (titleEl && meta) {
    titleEl.innerHTML = `
      Quiz
      <span class="quiz-title-topic">${meta.title}</span>
      <div class="quiz-meta-pills">
        <span class="qm-pill qm-subject"><i class="fa-solid fa-code"></i> ${meta.subject}</span>
        <span class="qm-pill qm-level"><i class="fa-solid fa-signal"></i> ${meta.level}</span>
        <span class="qm-pill qm-count"><i class="fa-solid fa-list-check"></i> ${quizData.length} Questions</span>
      </div>
    `;
  }

  /* ============================================
     RENDER QUESTIONS
  ============================================ */
  const form      = document.getElementById("quizForm");
  const submitBtn = document.getElementById("submitBtn");
  const scoreBox  = document.getElementById("scoreBox");

  scoreBox.style.display = "none";

  quizData.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <div class="q-number">Q${index + 1} <span class="q-total">of ${quizData.length}</span></div>
      <h4 class="q-text">${q.q}</h4>
      <div class="options">
        ${q.opts.map((opt, i) => `
          <label class="opt-label" data-q="${index}" data-i="${i}">
            <input type="radio" name="q${index}" value="${i}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt}</span>
          </label>
        `).join("")}
        <button type="button" class="clear-btn" data-q="${index}">
          <i class="fa-solid fa-xmark"></i> Clear
        </button>
      </div>
      <div class="explanation" id="exp-${index}">
        <div class="exp-header"><i class="fa-solid fa-circle-info"></i> Explanation</div>
        <p>${q.exp}</p>
      </div>
    `;
    form.appendChild(card);
  });

  /* ---- Clear button ---- */
  document.querySelectorAll(".clear-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qIndex = btn.dataset.q;
      document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(r => r.checked = false);
      document.querySelectorAll(`.opt-label[data-q="${qIndex}"]`).forEach(l => l.classList.remove("opt-selected"));
    });
  });

  /* ---- Visual label selection ---- */
  document.querySelectorAll(".opt-label").forEach(label => {
    label.addEventListener("click", () => {
      const qIndex = label.dataset.q;
      document.querySelectorAll(`.opt-label[data-q="${qIndex}"]`).forEach(l => l.classList.remove("opt-selected"));
      label.classList.add("opt-selected");
    });
  });

  /* ============================================
     PROGRESS INDICATOR (answered out of total)
  ============================================ */
  function updateAnswerProgress() {
    const answered = quizData.filter((_, i) => document.querySelector(`input[name="q${i}"]:checked`)).length;
    const pct = Math.round((answered / quizData.length) * 100);
    let indicator = document.getElementById("quizAnswerProgress");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.id = "quizAnswerProgress";
      indicator.style.cssText = "margin-bottom:16px; padding: 10px 18px; border-radius:12px; background: rgba(116,0,184,0.06); border:1px solid rgba(116,0,184,0.12); font-size:13px; font-weight:700; color: var(--text-muted); display:flex; align-items:center; gap:10px;";
      submitBtn.parentNode.insertBefore(indicator, submitBtn);
    }
    indicator.innerHTML = `
      <i class="fa-solid fa-circle-dot" style="color:var(--royal-violet)"></i>
      ${answered} / ${quizData.length} answered
      <div style="flex:1; height:6px; background:rgba(15,23,42,0.08); border-radius:10px; overflow:hidden; margin-left:8px;">
        <div style="height:100%; width:${pct}%; background:linear-gradient(90deg,var(--royal-violet),var(--strong-cyan)); border-radius:10px; transition:width 0.3s ease;"></div>
      </div>
      <span style="color:${answered === quizData.length ? '#38c172' : 'var(--text-muted)'}">
        ${answered === quizData.length ? '✓ All answered' : `${quizData.length - answered} remaining`}
      </span>
    `;
  }

  // Track answer changes for progress indicator
  form.addEventListener("change", updateAnswerProgress);
  updateAnswerProgress();

  /* ============================================
     SUBMIT LOGIC
  ============================================ */
  let submitted = false;

  submitBtn.addEventListener("click", () => {
    if (submitted) return;

    const unanswered = quizData.map((_, i) =>
      !document.querySelector(`input[name="q${i}"]:checked`) ? i + 1 : null
    ).filter(Boolean);

    if (unanswered.length > 0) {
      showQuizWarning(
        `Questions ${unanswered.join(", ")} are unanswered. Submit anyway?`,
        () => gradeQuiz()
      );
      return;
    }

    gradeQuiz();
  });

  function gradeQuiz() {
    submitted = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Submitted';

    let score = 0;
    const results = [];

    quizData.forEach((q, index) => {
      const selected    = document.querySelector(`input[name="q${index}"]:checked`);
      const labels      = document.querySelectorAll(`.opt-label[data-q="${index}"]`);
      const selectedIdx = selected ? Number(selected.value) : -1;
      const isCorrect   = selectedIdx === q.ans;

      if (isCorrect) score++;

      labels.forEach(l => l.classList.remove("opt-selected"));
      labels[q.ans]?.classList.add("correct");
      if (selected && !isCorrect) labels[selectedIdx]?.classList.add("wrong");

      const expEl = document.getElementById(`exp-${index}`);
      if (expEl) expEl.classList.add("active");

      results.push({ correct: isCorrect, selectedIdx, correctIdx: q.ans });
    });

    const percentage = Math.round((score / quizData.length) * 100);
    const passed     = percentage >= 80;

    // Save overall quiz result
    localStorage.setItem("quizResult", JSON.stringify({ progressKey, score: percentage }));

    // Per-topic score
    const topicResultsKey = `topicResults_${progressKey}`;
    const existingTopicResults = JSON.parse(localStorage.getItem(topicResultsKey)) || {};
    existingTopicResults[topicSlug] = {
      score: percentage,
      passed,
      date: Date.now(),
      attempts: (existingTopicResults[topicSlug]?.attempts || 0) + 1
    };
    localStorage.setItem(topicResultsKey, JSON.stringify(existingTopicResults));

    // Save per-topic progress for roadmap display
    const topicProgressKey = `topicProgress_${bankKey}`;
    const topicProgress = JSON.parse(localStorage.getItem(topicProgressKey)) || {};
    topicProgress[topicSlug] = {
      status: passed ? 'completed' : 'attempted',
      score: percentage,
      attempts: (topicProgress[topicSlug]?.attempts || 0) + 1,
      lastAttempt: Date.now()
    };
    localStorage.setItem(topicProgressKey, JSON.stringify(topicProgress));

    // Render score panel
    renderScorePanel(score, quizData.length, percentage, passed, results);

    // Scroll to score
    setTimeout(() => scoreBox.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  }

  /* ============================================
     SCORE PANEL
  ============================================ */
  function renderScorePanel(score, total, pct, passed, results) {
    const correct = results.filter(r => r.correct).length;
    const wrong   = results.filter(r => !r.correct && r.selectedIdx !== -1).length;
    const skipped = results.filter(r => r.selectedIdx === -1).length;

    scoreBox.style.display = "block";
    scoreBox.innerHTML = `
      <div class="score-result-card ${passed ? 'score-passed' : 'score-failed'}">
        <div class="score-circle-wrap">
          <svg class="score-ring" viewBox="0 0 120 120">
            <circle class="ring-bg" cx="60" cy="60" r="50" />
            <circle class="ring-fill ${passed ? 'ring-pass' : 'ring-fail'}" cx="60" cy="60" r="50"
              stroke-dasharray="${2 * Math.PI * 50}"
              stroke-dashoffset="${2 * Math.PI * 50 * (1 - pct / 100)}"
            />
          </svg>
          <div class="score-pct-label">
            <span class="score-pct-num">${pct}%</span>
            <span class="score-pct-sub">${passed ? "PASSED ✓" : "TRY AGAIN"}</span>
          </div>
        </div>

        <div class="score-stats-grid">
          <div class="score-stat correct-stat">
            <i class="fa-solid fa-circle-check"></i>
            <span class="stat-num">${correct}</span>
            <span class="stat-lbl">Correct</span>
          </div>
          <div class="score-stat wrong-stat">
            <i class="fa-solid fa-circle-xmark"></i>
            <span class="stat-num">${wrong}</span>
            <span class="stat-lbl">Wrong</span>
          </div>
          <div class="score-stat skip-stat">
            <i class="fa-solid fa-minus-circle"></i>
            <span class="stat-num">${skipped}</span>
            <span class="stat-lbl">Skipped</span>
          </div>
          <div class="score-stat total-stat">
            <i class="fa-solid fa-list-check"></i>
            <span class="stat-num">${total}</span>
            <span class="stat-lbl">Total</span>
          </div>
        </div>

        <div class="score-message">
          ${passed
            ? `<p><strong>🎉 Excellent work!</strong> You scored ${pct}% and passed the quiz. Your progress has been saved — you can now advance on your roadmap.</p>`
            : `<p><strong>📚 Keep going!</strong> You need 80% to pass. Review the explanations above, strengthen weak areas, and try again. You scored ${pct}%.</p>`
          }
          ${passed
            ? `<p style="margin-top:8px; font-size:13px; color:#059669;">
                 <i class="fa-solid fa-check-circle"></i>
                 Topic "<strong>${meta?.title || topicSlug}</strong>" marked as completed.
               </p>`
            : `<p style="margin-top:8px; font-size:13px; color:#b91c1c;">
                 <i class="fa-solid fa-lock"></i>
                 Next level remains locked. Pass with ≥80% to unlock progression.
               </p>`
          }
        </div>

        <div class="score-actions">
          <button class="score-btn score-btn-back" id="backToRoadmapBtn">
            <i class="fa-solid fa-arrow-left"></i> Back to Roadmap
          </button>
          ${!passed ? `
          <button class="score-btn score-btn-retry" id="retryQuizBtn">
            <i class="fa-solid fa-rotate-right"></i> Retry Quiz
          </button>` : `
          <button class="score-btn score-btn-retry" id="nextTopicBtn" style="background:linear-gradient(135deg,#38c172,#56cfe1);">
            <i class="fa-solid fa-arrow-right"></i> Back to Roadmap
          </button>`
          }
        </div>
      </div>
    `;

    document.getElementById("backToRoadmapBtn")?.addEventListener("click", () => {
      window.location.href = "roadmap.html";
    });

    document.getElementById("retryQuizBtn")?.addEventListener("click", () => {
      window.location.reload();
    });

    document.getElementById("nextTopicBtn")?.addEventListener("click", () => {
      window.location.href = "roadmap.html";
    });
  }

  /* ============================================
     CONFIRM DIALOG (unanswered warning)
  ============================================ */
  function showQuizWarning(msg, onConfirm) {
    const existing = document.getElementById("quizWarning");
    if (existing) existing.remove();

    const box = document.createElement("div");
    box.id = "quizWarning";
    box.className = "quiz-warning-box";
    box.innerHTML = `
      <p><i class="fa-solid fa-triangle-exclamation"></i> ${msg}</p>
      <div class="warning-actions">
        <button class="wbtn wbtn-confirm" id="wConfirm">Yes, Submit</button>
        <button class="wbtn wbtn-cancel" id="wCancel">Go Back</button>
      </div>
    `;
    submitBtn.after(box);

    document.getElementById("wConfirm").addEventListener("click", () => { box.remove(); onConfirm(); });
    document.getElementById("wCancel").addEventListener("click", () => box.remove());
  }

  /* ============================================
     DEFAULT FALLBACK QUESTIONS
  ============================================ */
  function getDefaultQuestions() {
    return [
      { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], ans: 1, exp: "Binary search divides the search space in half each iteration, giving O(log n)." },
      { q: "Which data structure uses FIFO?", opts: ["Stack", "Queue", "Tree", "Graph"], ans: 1, exp: "Queue follows First In, First Out." },
      { q: "Which sorting runs in O(n log n) average and worst case?", opts: ["Quick Sort", "Bubble Sort", "Merge Sort", "Selection Sort"], ans: 2, exp: "Merge Sort guarantees O(n log n) always." },
      { q: "What does BFS stand for?", opts: ["Binary First Search", "Breadth-First Search", "Best-First Search", "Base File Search"], ans: 1, exp: "BFS stands for Breadth-First Search — explores nodes level by level using a queue." },
      { q: "What data structure does DFS typically use?", opts: ["Queue", "Stack (or recursion)", "Heap", "Array"], ans: 1, exp: "DFS uses a stack (explicitly or via recursion call stack) to track the path." },
      { q: "What is a hash collision?", opts: ["Deleting a hash table entry", "Two different keys mapping to the same hash bucket", "A hash function error", "An overflow in the hash table"], ans: 1, exp: "Collision occurs when two distinct keys produce the same hash value. Resolved via chaining (linked lists) or open addressing (linear/quadratic probing)." },
      { q: "The amortized cost of n push+pop operations on a stack is:", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1) per operation"], ans: 3, exp: "Each element is pushed and popped at most once. Total work is O(n) for n operations — O(1) amortized per operation." },
      { q: "Which traversal visits root, then left, then right?", opts: ["In-order", "Post-order", "Pre-order", "Level-order"], ans: 2, exp: "Pre-order: Root → Left → Right. In-order: Left → Root → Right. Post-order: Left → Right → Root." },
      { q: "What property must a min-heap satisfy?", opts: ["Every node > its children", "Every node ≤ its children", "Left child < right child always", "All leaves at same depth"], ans: 1, exp: "Min-heap: every parent ≤ both children. The minimum element is always at the root." },
      { q: "What is the purpose of memoization?", opts: ["Reduce code length", "Cache subproblem results to avoid redundant recomputation", "Sort data faster", "Compress memory usage"], ans: 1, exp: "Memoization stores results of expensive function calls. When called again with the same inputs, returns the cached result — turning exponential to polynomial for DP problems." },
    ];
  }
}
