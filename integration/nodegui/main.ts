import 'reflect-metadata';
import { ViewUtil } from '@ng-qt/core/src/renderer/view-util';
import { AppWindow } from '@ng-qt/platform';
import { View } from '@ng-qt/common/widgets/view';
import { Button } from '@ng-qt/common/widgets/button';
import { Text } from '@ng-qt/common/widgets/text';
import { FlexLayout } from '@nodegui/nodegui';

// @ts-ignore
const viewUtil = new ViewUtil();

const window = new AppWindow();
window.centralWidget.setObjectName('app');
// window.show();

const view = new View();
window.layout.addWidget(view);
window.show();

const view1 = new View();
viewUtil.addWidget(view, view1);

const button1 = new Button();
button1.setText('Button1');
// @ts-ignore
viewUtil.addWidget(view1, button1);

const text1 = new Text();
text1.setText('Text1');
// @ts-ignore
viewUtil.addWidget(view1, text1);

const text2 = new Text();
text2.setText('Text2');

(view1.layout as FlexLayout).insertChildBefore(text2, button1);

(global as any).win = window; //to keep gc from collecting ui widgets
