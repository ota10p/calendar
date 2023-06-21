# calendar
オリジナルカレンダーアプリです。  
左右のボタンをクリックすると月の表示を切り替える事ができます。無限に切り替える事が可能です。  
初期表示で現在の日付にマークをつけるようにし、一度、月を切り替えて戻ってきても変わらずマークされるようにしております。  
月の始まりは各月毎に曜日が異なるので、月によって表示される場所が異なるようにしております。  
レスポンシブデザインも考慮してスマホでもパソコンでも利用できます。  
URL：https://ota10p.github.io/calendar/  

<img width="528" alt="スクリーンショット 2023-06-20 0 20 53" src="https://github.com/ota10p/calendar/assets/135662234/c251d01a-b943-4d59-b87b-e23db1366ccf">
<img width="516" alt="スクリーンショット 2023-06-20 0 27 29" src="https://github.com/ota10p/calendar/assets/135662234/17923f2e-f5c2-447f-8b44-59f503a1a13c">

## 使用技術
- html 5
- css 3
- typescript 5.0.3
- webpack 5.77.0

## プログラムの構成
- クラスなどを用いて、オブジェクト思考のプログラムで作成
- 日付の状態を管理するクラス、表示させるフィールドを作成して日付を表示させるという役割のクラスで構成
- 表示させている年月日、曜日、現在の日付などを管理するクラスはシングルトンクラスで作成
- 関数名をできるだけ短くし、関数名を見ただけで何をしているか分かり易いように命名  
for分の中でfor文をさらに使用し、h1タグやtrタグなどをjsで全て作成したのが複雑で難しかった、、、  
