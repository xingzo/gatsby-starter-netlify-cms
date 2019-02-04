import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      window.React = React;
      window.ReactDOM = ReactDOM;
    }

    this.state = {
      showButton: false,
    };
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    console.log(this.props)

    // this.setState({ showButton: true });


    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("componentDidMount")
      this.setState({ showButton: true });
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('next-props', nextProps)
  //   console.log('this.props', this.props)
  //
  //
  //   // console.log('next-state', nextState)
  //
  //   if (nextProps === this.props) {
  //     return false;
  //   }else {
  //     return true
  //   }
  //
  // }
  componentWillUpdate(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    if (typeof window !== 'undefined') {
      const paypal = window.PAYPAL}

      // TODO: need to fix this line of code. Dev wont work without it
      // add a staging envrionment
      // const paypal = window.PAYPAL

    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;


    const {
      showButton,
    } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

    return (
      <div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    );
   }
  }

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
