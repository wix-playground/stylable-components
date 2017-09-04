import {DriverBase} from "test-drive-react";
import {TreeViewDemo, TreeViewDemoCustom} from "../../demo/components/tree-view-demo";
import {TreeViewDriver} from "../components/tree-view.driver";

export class TreeViewDemoDriver extends DriverBase {
    static ComponentClass = TreeViewDemo;

    get demoComponent(): TreeViewDriver {
        return new TreeViewDriver(this.select('TREE_VIEW_DEMO'));
    }


}

export class TreeViewDemoCustomDriver extends DriverBase {
    static ComponentClass = TreeViewDemoCustom;

    get demoComponent(): TreeViewDriver {
        return new TreeViewDriver(this.select('TREE_VIEW_DEMO_CUSTOM'));
    }
}
