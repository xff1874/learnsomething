function withSubScription(WrapComponent, sData) {

    return class extends Component {
        constructor(props) {
            super(props)
            this.handleChange = this.handleChange.bind(this);
            this.stata = {
                data: sData(DataSource, props)
            }
        }

        render() {
            return <WrapComponent data={this.state.data} {...this.props} />
        }
    }
}