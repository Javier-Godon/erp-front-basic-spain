import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog'
import { NewProductDialogComponent } from '../dialogs/new-product-dialog/new-product-dialog.component';
import { FormBuilder } from '@angular/forms';

/**
 * Node for catalog item
 */
export class CatalogItemNode {
  children: CatalogItemNode[];
  item: string;
}

/** Flat catalog item node with expandable and level information */
export class CatalogItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for catalog list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read',
    'Upgrade'
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a catalog item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<CatalogItemNode[]>([]);

  get data(): CatalogItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `CatalogItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `CatalogItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): CatalogItemNode[] {
    return Object.keys(obj).reduce<CatalogItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new CatalogItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to catalog list */
  insertItem(parent: CatalogItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as CatalogItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: CatalogItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-catalog-main',
  templateUrl: './catalog-main-old-mattree.component.html',
  styleUrls: ['./catalog-main.component.scss'],
  providers: [ChecklistDatabase]
})
export class CatalogMainComponent {

  street: string;
  number: number;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CatalogItemFlatNode, CatalogItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<CatalogItemNode, CatalogItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: CatalogItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<CatalogItemFlatNode>;

  treeFlattener: MatTreeFlattener<CatalogItemNode, CatalogItemFlatNode>;

  dataSource: MatTreeFlatDataSource<CatalogItemNode, CatalogItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<CatalogItemFlatNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase, private fb: FormBuilder, public dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CatalogItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: CatalogItemFlatNode) => node.level;

  isExpandable = (node: CatalogItemFlatNode) => node.expandable;

  getChildren = (node: CatalogItemNode): CatalogItemNode[] => node.children;

  hasChild = (_: number, _nodeData: CatalogItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: CatalogItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: CatalogItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new CatalogItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CatalogItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CatalogItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the catalog item selection. Select/deselect all the descendants node */
  catalogItemSelectionToggle(node: CatalogItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf catalog item selection. Check all the parents to see if they changed */
  catalogLeafItemSelectionToggle(node: CatalogItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CatalogItemFlatNode): void {
    let parent: CatalogItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: CatalogItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: CatalogItemFlatNode): CatalogItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: CatalogItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: CatalogItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      data: {street: this.street, number: this.number}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.street = result;
    });
  }

}






/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */