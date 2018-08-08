# 给绑定在dom上的方法传参

## 定义
``` typescript
getDetailByBookId = (id: string) => {
  console.log(id)
}
```

## 调用
``` typescript
<a data-id={book._id.$oid} onClick={this.getDetailByBookId.bind(this, book._id.$oid)}>详情</a>

```

# 行内式css取值为变量的写法

``` typescript

style={{ display: `${this.state.custom_window_state}`,

 minWidth: `${this.state.minWidth_name}`}}

```

# typescript语法编写react组件的代码基础结构

``` typescript
interface IState {
  test1?: string
  test2?: string
}

export interface IProps {
  empty?: any
 }
export default class CompontentName extends React.Component<IProps, IState> {
     // 这里初始化组件的全局变量
     map:any
     constructor(props: IProps, state: IState) {
          super(props)
          this.state = {
                 test1: '',
                 test2: ''
           }
      }
      render() {
           return (
              <div>
                   {dom or compontent}

              </div>
          ）
     }
}

```

# typescript中接口定义及使用

**注意接口写在class外部，数据的使用在class内部**

``` typescript

 定义IList接口 

interface IList {
  title: string
}

 使用IList接口

data: IList[] = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    }
  ]

```

# react+typescript实现子组件调用父组件方法的效果

组件结构



如图C组件想要调用A组件中的方法-getBooks，首先C组件需要向外暴露接口

``` typescript

interface IProps {

  onComplete?: () => void

 }

```

并且在C组件需要的地方做该方法的调用

``
self.props.onComplete!()
`` 

此时B组件中

B组件对C组件的引用为：

`` 
<C onComplete={this.fatherComplete} }/>
``

因为C组件想要调用的方法是在A组件中，所以B组件首先要实现C组件暴露的接口，同时向外继续暴露接口

B组件向外暴露接口

```typescript
interface IProps {
  onComplete?: () => void
}
```

B组件实现C组件暴露的接口
```typescript
fatherComplete = () => {
    this.props.onComplete!()
}
```
A组件中
A组件对B组件的引用为：
```typescript
<B  onComplete={this.addFormComplete} />
```
A组件继续实现B组件暴露给他的接口，此时C组件想要调用的getBooks方法就在该组件中就可以直接做this.getBooks的调用

```typescript
addFormComplete = () => {
    this.getBooks()
 }
```
然后就可以实现C组件调用A组件中getBooks方法的效果