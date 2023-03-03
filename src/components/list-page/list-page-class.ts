export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    addByIndex: (element: T, position: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    deleteByIndex: (position: number) => void;
    toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor(initialArray: T[]) {
        this.head = null;
        this.size = 0;
        initialArray.forEach(element => this.append(element))
    }

    prepend(element: T): void {
        const node = new Node(element, this.head);
        this.head = node;
        this.size++;
    }

    append(element: T) {
        const node = new Node(element);
        if (this.head) {
            let current = this.head;
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        } else {
            this.head = node;
        }
        this.size++;
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            return;
        }
        if (!this.head || index <= 0) {
            this.prepend(element);
        }
        else if (index >= (this.size - 1)) {
            this.append(element);
        } else {
            let current = this.head;
            let currentIndex = 0;

            while (currentIndex !== (index - 1) && current.next) {
                current = current.next;
                currentIndex++;
            }

            const node = new Node(element, current.next);
            current.next = node;
            this.size++;
        }
    }


    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    deleteTail() {
        let current;
        if (!this.head?.next) {
            this.head = null;
        } else {
            current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return;
        }
        let current = this.head;
        if (index === 0) {
            if (this.head) this.head = this.head?.next;
        } else {
            let prev = null;
            let currIndex = 0;
            while (currIndex++ < index) {
                prev = current;
                if (current) {
                    current = current.next;
                }
            }
            if (prev?.next) prev.next = current?.next ? current.next : null;
        }
        this.size--;
    }


    toArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res
    }
}