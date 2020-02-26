class Node {
    constructor(key) {
        this.key = key;
        this.randomKey = null;
        this.parent = null;
        this.children = [];
        this.spacing = null;
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.previousSpacing = 0;
        this.root = new Node(null);
        this.root.spacing = 0;
        this.nodeLevels = [];
        for(let i =0; i < 26; i++){
            this.nodeLevels[i] = [];
        }
    }

    createTree(keys) {
        let output = ["Not present in trie", "Present in trie"];
        let uniqueFirst = [];
        for(let y = 0; y < keys.length; y++) {
            keys[y] = keys[y].trim();
            if(uniqueFirst.indexOf(keys[y].charAt(0)) < 0) {
                uniqueFirst.push(keys[y].charAt(0));
            }
        }
        for(let i = 0; i < keys.length; i++) {
            this.insert(keys[i], uniqueFirst);
        }
        // Search for different keys
        if(this.search("the") === true)
            console.log("the --- " + output[1]);
        else console.log("the --- " + output[0]);

        if(this.search("these") === true)
            console.log("these --- " + output[1]);
        else console.log("these --- " + output[0]);
    }

    insert(word, firstChars) {
        let length = word.length;
        let currentNode = this.root;
        for (let level = 0; level < length; level++) {
            if(currentNode.children[word[level]] == null) {
                currentNode.children[word[level]] = new Node(word[level]);
                currentNode.children[word[level]].randomKey = word[level] + Math.floor(Math.random() * 100).toString();
                this.nodeLevels[level].push(word[level]);
                currentNode.children[word[level]].parent = currentNode;
                currentNode.children[word[level]].level = level;
                if(currentNode.spacing !== null && currentNode.spacing !== 0) {
                    currentNode.children[word[level]].spacing = currentNode.spacing;
                } else if (firstChars.indexOf(word[level]) >= 0) {
                    console.log(currentNode.children[word[level]]);
                    currentNode.children[word[level]].spacing = this.previousSpacing + (firstChars.length * 100);
                    this.previousSpacing = currentNode.children[word[level]].spacing;
                    console.log(currentNode.children[word[level]]);
                } else {
                    currentNode.children[word[level]].spacing = (this.nodeLevels[level].length * 200);
                }
            }
            currentNode = currentNode.children[word[level]];
        }
        currentNode.isEndOfWord = true;
    }

    search(word) {
        let length = word.length;
        let currentNode = this.root;
        for (let level = 0; level < length; level++) {
            if(currentNode.children[word[level]] == null) {
                return false;
            }
            currentNode = currentNode.children[word[level]];
        }
        return (currentNode !== null && currentNode.isEndOfWord);
    }
}
export {Trie}