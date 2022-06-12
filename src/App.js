import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React, {lazy} from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';


const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem('page-has-been-force-refreshed') || 'false');

    try {
      const component = await componentImport();

      window.localStorage.setItem('page-has-been-force-refreshed', 'false');

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      // Let's let the application crash and raise the error.
      throw error;
    }
  });

const AlertPage = lazyWithRetry(() => import('pages/AlertPage'));
const AuthModalPage = lazyWithRetry(() => import('pages/AuthModalPage'));
const BadgePage = lazyWithRetry(() => import('pages/BadgePage'));
const ButtonGroupPage = lazyWithRetry(() => import('pages/ButtonGroupPage'));
const ButtonPage = lazyWithRetry(() => import('pages/ButtonPage'));
const CardPage = lazyWithRetry(() => import('pages/CardPage'));
const ChartPage = lazyWithRetry(() => import('pages/ChartPage'));
const DashboardPage = lazyWithRetry(() => import('pages/DashboardPage'));
const DropdownPage = lazyWithRetry(() => import('pages/DropdownPage'));
const FormPage = lazyWithRetry(() => import('pages/FormPage'));
const InputGroupPage = lazyWithRetry(() => import('pages/InputGroupPage'));
const ModalPage = lazyWithRetry(() => import('pages/ModalPage'));
const ProgressPage = lazyWithRetry(() => import('pages/ProgressPage'));
const TablePage = lazyWithRetry(() => import('pages/TablePage'));
const TypographyPage = lazyWithRetry(() => import('pages/TypographyPage'));
const WidgetPage = lazyWithRetry(() => import('pages/WidgetPage'));

const getBasename = () => {
  // console.log("`/${process.env.PUBLIC_URL.split('/').pop()}` : ", `/${process.env.PUBLIC_URL.split('/').pop()}`)
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />
                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
