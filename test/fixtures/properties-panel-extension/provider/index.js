import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

function Props(element) {

  return [
    {
      id: 'spell',
      component: <Prop id="spell" element={ element } />,
      isEdited: isTextFieldEntryEdited
    }
  ];
}

function Prop(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.foo || '';
  };

  const setValue = value => {
    return modeling.updateProperties(element, {
      foo: value
    });
  };

  return <TextFieldEntry
    id={ id }
    element={ element }
    label={ translate('Foo') }
    getValue={ getValue }
    setValue={ setValue }
    debounce={ debounce }
  />;
}

function createGroup(element) {
  const group = {
    id: 'foo',
    label: 'foo',
    entries: Props(element)
  };

  return group;
}

class PropertiesProvider {
  constructor(propertiesPanel, injector) {
    this._injector = injector;
    propertiesPanel.registerProvider(this);
  }

  getGroups(element) {
    return groups => {
      groups.push(createGroup(element));

      return groups;
    };
  }
}

PropertiesProvider.$inject = [
  'propertiesPanel',
  'injector'
];

export default {
  __init__: [ 'propertiesProvider' ],
  propertiesProvider: [ 'type', PropertiesProvider ]
};