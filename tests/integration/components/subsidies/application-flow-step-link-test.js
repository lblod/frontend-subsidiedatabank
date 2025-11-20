import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-subsidiedatabank/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | subsidies/application-flow-step-link',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Subsidies::ApplicationFlowStepLink />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <Subsidies::ApplicationFlowStepLink>
        template block text
      </Subsidies::ApplicationFlowStepLink>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  },
);
