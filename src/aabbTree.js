/**
 * This file contains an implementation of an Axis Aligned Bounding Box Tree, by Eyal Shalev
 * You can modify it and use it for your projects without any limitations.
 * I only ask that:
 * 1. You leave this message in the Code.
 * 2. Drop me a message that you used it via: https://sourceforge.net/projects/javascripaabbtr/
 *
 * This file will work as is with no requirements to include other files along-side it.
 *
 * See example usage in aabbTreeExample.html
 *
 * Enjoy :-)
 */

var AabbTree = new function() {

  /**
   * @returns (array) returns a cloned copy of a vector
   * @param v the vector to clone
   */
  function cloneArray(v) {
    var ret = [];
    for (var c = 0; c < v.length; c++) {
      ret[c] = v[c];
    }
    return ret;
  }

  /**
   * @constructor Creates an axis aligned bounding box.
   * @param pos (array) the offset of the bounding box
   * @param size (array) the size of the bounding box
   */
  this.AxisAlignedBox=function(pos, size) {
    this.pos = [0,0];
    this.size = [0,0];
    this.pos = cloneArray(pos);
    this.size = cloneArray(size);

    /**
     * @brief Split the box into two equal parts on the Nth dimension
     * @param dimension The plane on which to split the box (0=x,1=y,...)
     */
    this.split = function(dimension) {
      var halfSize = cloneArray(this.size);
      halfSize[dimension] /= 2;
      var halfPos = cloneArray(this.pos);
      halfPos[dimension] += halfSize[dimension];
      var minBox = new AabbTree.AxisAlignedBox(this.pos, halfSize);
      var maxBox = new AabbTree.AxisAlignedBox(halfPos, halfSize);
      return [minBox,maxBox];
    }
    return this;

  };

  /**
   * @returns (bool) true if two boxes intersects
   */
  function AxisAlignedBoxIntersects(b1, b2) {
    //iterate over all dimensions:
    for (var d = 0; d < b1.pos.length; d++) {
      if (b1.pos[d] > (b2.pos[d] + b2.size[d])) {
        return false;
      }
      if (b2.pos[d] > (b1.pos[d] + b1.size[d])) {
        return false;
      }

    }
    return true;
  }

  /**
   * @constructor Creates an AABB tree
   * @param bounds (AxisAlignedBox) The bounds of the node. The Node will exist on the same number of dimensions as it's bounds. Example: 2D bounds will result in a 2 dimensional Aabb-Tree
   */
  this.AABBTreeNode=function (bounds) {
    //The bounds of the proposed child-nodes of this node:
    var childBounds = [];
    //The actual child Nodes, undefined if node has not yet been split:
    var childNodes;
    //Entries belonging specifically to this node, and cannot belong to children:
    var entries = {};
    //Entries which will be put in child-nodes as soon as node is split.
    var entriesWatingForChildren = {};

    function calculateChildBounds() {
      //Look for the biggest dimension to split this node against.
      var bigDimension = 0;
      var bigDimensionSize = 0;
      for (var d = 0; d < bounds.size.length; d++) {
        var dimensionSize = bounds.size[d];
        if (dimensionSize > bigDimensionSize) {
          bigDimensionSize = dimensionSize;
          bigDimension = d;
        }
      }
      //Split to children along the biggest dimension of this node
      childBounds = bounds.split(bigDimension);
    }

    calculateChildBounds();

    /**
     * @returns (bool) True if aabb intersects only one child node.
     */
    this.isChildEntry = function(entryBounds) {
      var ret = false;
      for (var c = 0; c < childBounds.length; c++) {
        if (AxisAlignedBoxIntersects(childBounds[c], entryBounds)) {
          if (ret) {
            //Not a child entry if intersects more than one child
            return false;
          }
          ret = true;
        }
      }
      return ret
    }

    /**
     * @brief add an entry to the node.
     * @param id A unique identifier for the entry. After identifier has been used, it cannot be used again
     * @param entryBounds (AxisAlignedBox) the bounds in which the new entry exists
     */
    this.add = function(id, entryBounds) {
      if (!this.isChildEntry(entryBounds)) {
        //Entry cannot be stored in a child node. It belongs to this node
        entries[id] = entryBounds;
      } else {
        //Entry belongs in a childnode (Entry is contained wholly within child).

        //Check  if there is allready an entry waiting to be stored in children. If so create children.
        for (var e in entriesWatingForChildren) {
          //an entry exists in this node and is made for the child nodes:
          var eAABB = entriesWatingForChildren[e];
          if (!childNodes) {
            //Create children
            childNodes = [];
            for (var c = 0; c < childBounds.length; c++) {
              childNodes.push(new AabbTree.AABBTreeNode(childBounds[c]));
            }
          } else {
            throw "Trying to create child nodes twice, should never come here";
          }
          entriesWatingForChildren = {};
          //Re-process child
          this.add(e, eAABB)
        }
        //Check if this node has allready been split:
        if (childNodes) {
          //Insert entry into appropriate child:
          for (var c = 0; c < childNodes.length; c++) {
            if (AxisAlignedBoxIntersects(childBounds[c], entryBounds)) {
              childNodes[c].add(id, entryBounds);
            }
          }
        } else {
          //Not enough entries to create children:
          //Store for later:
          entriesWatingForChildren[id] = entryBounds;
        }
      }
    }

    /**
     * @brief adds the contents of source into target
     * @param target
     * @param source
     */
    function extendObject(target, source) {
      for (var id in source) {
        target[id] = source;
      }
    }

    /**
     * @brief traverses the tree and returns all intersecting entries.
     * @param queryBounds (AxisAlignedBox) The bounds of the query
     * @param queryerId (optional) The id of the Querier. If specified all self collisions are ignored
     * @returns A table of bounding boxes indexed by uniqueIDs
     */
    this.intersects = function(queryBounds,queryerId) {
      var ret = {};
      //Check all of my entries:
      for (var id in entries) {
        if (id != queryerId) {
          if (AxisAlignedBoxIntersects(queryBounds, entries[id])) {
            ret[id] = true;
          }
        }
      }
      //Check all pending entries:
      for (var id in entriesWatingForChildren) {
        if (id != queryerId) {
          if (AxisAlignedBoxIntersects(queryBounds, entriesWatingForChildren[id])) {
            ret[id] = true;
          }
        }
      }
      //Check children recursively:
      if (childNodes) {
        for (var c = 0; c < childNodes.length; c++) {
          if (AxisAlignedBoxIntersects(childBounds[c], queryBounds)) {
            extendObject(ret, childNodes[c].intersects(queryBounds, queryerId));
          }
        }
      }
      return ret;
    };
  }

}();
