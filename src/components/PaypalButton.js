import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    if (typeof window !== 'undefined') {
      window.React = React;
      window.ReactDOM = ReactDOM;}

=======
    window.React = React;
    window.ReactDOM = ReactDOM;
>>>>>>> 5ad6a143da5d52654eeb725adea1cfa4c08e3829
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
    // console.log(nextProps)
    // console.log(this.props)

    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    // this.setState({ showButton: true });

    // isScriptLoaded = true
    // isScriptLoadSucceed = true
    // if (this.props.isScriptLoadSucceed) {
    //   this.setState({ showButton: true });
    // }
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
<<<<<<< HEAD
    if (typeof window !== 'undefined') {
      const paypal = window.PAYPAL}


=======
    const paypal = window.PAYPAL
>>>>>>> 5ad6a143da5d52654eeb725adea1cfa4c08e3829
    // console.log(paypal)

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
