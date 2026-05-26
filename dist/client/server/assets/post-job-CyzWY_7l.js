import { a as React2, T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { b as Presence, c as Primitive, a8 as useComposedRefs, n as composeEventHandlers, ad as useSize, q as createContextScope, l as cn, a6 as useAuth, ab as useNavigate, ac as useQueryClient, L as Link, a4 as toast } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { r as createLucideIcon, w as useControllableState, C as Check, o as Slot, n as SiteHeader, b as Button, m as SiteFooter, a as Briefcase } from "./site-chrome-Bvu9S7aA.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { T as Textarea } from "./textarea-rlBQz2Te.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-D3-FAHFg.js";
import { u as usePrevious } from "./index-CV0emg7h.js";
import { R as RadioGroup, a as RadioGroupItem, o as objectType, b as booleanType, s as stringType, e as enumType, Z as ZodIssueCode } from "./types-BvBJ3Z1V.js";
import { I as INDUSTRIES } from "./kazi-data-D6hJPER9.js";
import { L as Label } from "./label-BkE_bE0M.js";
import { A as ArrowLeft } from "./arrow-left-ubG9ohLg.js";
import { A as ArrowRight, S as Sparkles } from "./sparkles-BJXlPMQM.js";
import { S as ShieldCheck } from "./shield-check-BwmLv38s.js";
import { G as Globe } from "./globe-QP9j5P55.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
const isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var isNameInFieldArray = (names, name) => name.split(".").some((part, index, arr) => !isNaN(Number(part)) && names.has(arr.slice(0, index).join(".")));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  if (data instanceof Date) {
    return new Date(data);
  }
  const isFileListInstance = typeof FileList !== "undefined" && data instanceof FileList;
  if (isWeb && (data instanceof Blob || isFileListInstance)) {
    return data;
  }
  const isArray = Array.isArray(data);
  if (!isArray && !(isObject(data) && isPlainObject(data))) {
    return data;
  }
  const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      copy[key] = cloneObject(data[key]);
    }
  }
  return copy;
}
var isKey = (value) => /^\w*$/.test(value);
var isUndefined = (val) => val === void 0;
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const paths = isKey(path) ? [path] : stringToPath(path);
  const result = paths.reduce((result2, key) => {
    return isNullOrUndefined(result2) ? void 0 : result2[key];
  }, object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var isFunction$1 = (value) => typeof value === "function";
var set = (object, path, value) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
const EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change",
  SUBMIT: "submit",
  TRIGGER: "trigger",
  VALID: "valid"
};
const VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
const INPUT_VALIDATION_RULES = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
const FORM_ERROR_TYPE = "form";
const ROOT_ERROR_TYPE = "root";
const HookFormControlContext = React2.createContext(null);
HookFormControlContext.displayName = "HookFormControlContext";
const useFormControlContext = () => React2.useContext(HookFormControlContext);
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {};
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        localProxyFormState && (localProxyFormState[_key] = true);
        return formState[_key];
      }
    });
  }
  return result;
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React2.useLayoutEffect : React2.useEffect;
function useFormState(props) {
  const formControl = useFormControlContext();
  const { control = formControl, disabled, name, exact } = props || {};
  const [formState, updateFormState] = React2.useState(() => ({
    ...control._formState,
    defaultValues: control._defaultValues
  }));
  const _localProxyFormState = React2.useRef({
    isDirty: false,
    isLoading: false,
    dirtyFields: false,
    touchedFields: false,
    validatingFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  });
  useIsomorphicLayoutEffect(() => control._subscribe({
    name,
    formState: _localProxyFormState.current,
    exact,
    callback: (formState2) => {
      !disabled && updateFormState({
        ...control._formState,
        ...formState2,
        defaultValues: control._defaultValues
      });
    }
  }), [name, disabled, exact]);
  React2.useEffect(() => {
    _localProxyFormState.current.isValid && control._setValid(true);
  }, [control]);
  return React2.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual(object1, object2, visited = /* @__PURE__ */ new WeakSet()) {
  if (object1 === object2) {
    return true;
  }
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return Object.is(object1, object2);
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return Object.is(object1.getTime(), object2.getTime());
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  if (visited.has(object1) || visited.has(object2)) {
    return true;
  }
  visited.add(object1);
  visited.add(object2);
  for (const key of keys1) {
    const val1 = object1[key];
    if (!(key in object2)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || (isObject(val1) || Array.isArray(val1)) && (isObject(val2) || Array.isArray(val2)) ? !deepEqual(val1, val2, visited) : !Object.is(val1, val2)) {
        return false;
      }
    }
  }
  return true;
}
function useWatch(props) {
  const formControl = useFormControlContext();
  const { control = formControl, name, defaultValue, disabled, exact, compute } = props || {};
  const _defaultValue = React2.useRef(defaultValue);
  const _compute = React2.useRef(compute);
  const _computeFormValues = React2.useRef(void 0);
  const _prevControl = React2.useRef(control);
  const _prevName = React2.useRef(name);
  _compute.current = compute;
  const [value, updateValue] = React2.useState(() => {
    const defaultValue2 = control._getWatch(name, _defaultValue.current);
    return _compute.current ? _compute.current(defaultValue2) : defaultValue2;
  });
  const getCurrentOutput = React2.useCallback((values) => {
    const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
    return _compute.current ? _compute.current(formValues) : formValues;
  }, [control._formValues, control._names, name]);
  const refreshValue = React2.useCallback((values) => {
    if (!disabled) {
      const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
      if (_compute.current) {
        const computedFormValues = _compute.current(formValues);
        if (!deepEqual(computedFormValues, _computeFormValues.current)) {
          updateValue(computedFormValues);
          _computeFormValues.current = computedFormValues;
        }
      } else {
        updateValue(formValues);
      }
    }
  }, [control._formValues, control._names, disabled, name]);
  useIsomorphicLayoutEffect(() => {
    if (_prevControl.current !== control || !deepEqual(_prevName.current, name)) {
      _prevControl.current = control;
      _prevName.current = name;
      refreshValue();
    }
    return control._subscribe({
      name,
      formState: {
        values: true
      },
      exact,
      callback: (formState) => {
        refreshValue(formState.values);
      }
    });
  }, [control, exact, name, refreshValue]);
  React2.useEffect(() => control._removeUnmounted());
  const controlChanged = _prevControl.current !== control;
  const prevName = _prevName.current;
  const computedOutput = React2.useMemo(() => {
    if (disabled) {
      return null;
    }
    const nameChanged = !controlChanged && !deepEqual(prevName, name);
    const shouldReturnImmediate = controlChanged || nameChanged;
    return shouldReturnImmediate ? getCurrentOutput() : null;
  }, [disabled, controlChanged, name, prevName, getCurrentOutput]);
  return computedOutput !== null ? computedOutput : value;
}
function useController(props) {
  const formControl = useFormControlContext();
  const { name, disabled, control = formControl, shouldUnregister, defaultValue, exact = true } = props;
  const isArrayField = isNameInFieldArray(control._names.array, name);
  const defaultValueMemo = React2.useMemo(() => get(control._formValues, name, get(control._defaultValues, name, defaultValue)), [control, name, defaultValue]);
  const value = useWatch({
    control,
    name,
    defaultValue: defaultValueMemo,
    exact
  });
  const formState = useFormState({
    control,
    name,
    exact
  });
  const _props = React2.useRef(props);
  const _registerProps = React2.useRef(control.register(name, {
    ...props.rules,
    value,
    ...isBoolean(props.disabled) ? { disabled: props.disabled } : {}
  }));
  _props.current = props;
  const fieldState = React2.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: true,
      get: () => !!get(formState.errors, name)
    },
    isDirty: {
      enumerable: true,
      get: () => !!get(formState.dirtyFields, name)
    },
    isTouched: {
      enumerable: true,
      get: () => !!get(formState.touchedFields, name)
    },
    isValidating: {
      enumerable: true,
      get: () => !!get(formState.validatingFields, name)
    },
    error: {
      enumerable: true,
      get: () => get(formState.errors, name)
    }
  }), [formState, name]);
  const onChange = React2.useCallback((event) => _registerProps.current.onChange({
    target: {
      value: getEventValue(event),
      name
    },
    type: EVENTS.CHANGE
  }), [name]);
  const onBlur = React2.useCallback(() => _registerProps.current.onBlur({
    target: {
      value: get(control._formValues, name),
      name
    },
    type: EVENTS.BLUR
  }), [name, control._formValues]);
  const ref = React2.useCallback((elm) => {
    const field2 = get(control._fields, name);
    if (field2 && field2._f && elm) {
      field2._f.ref = {
        focus: () => isFunction$1(elm.focus) && elm.focus(),
        select: () => isFunction$1(elm.select) && elm.select(),
        setCustomValidity: (message) => isFunction$1(elm.setCustomValidity) && elm.setCustomValidity(message),
        reportValidity: () => isFunction$1(elm.reportValidity) && elm.reportValidity()
      };
    }
  }, [control._fields, name]);
  const field = React2.useMemo(() => ({
    name,
    value,
    ...isBoolean(disabled) || formState.disabled ? { disabled: formState.disabled || disabled } : {},
    onChange,
    onBlur,
    ref
  }), [name, disabled, formState.disabled, onChange, onBlur, ref, value]);
  React2.useEffect(() => {
    const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
    control.register(name, {
      ..._props.current.rules,
      ...isBoolean(_props.current.disabled) ? { disabled: _props.current.disabled } : {}
    });
    const updateMounted = (name2, value2) => {
      const field2 = get(control._fields, name2);
      if (field2 && field2._f) {
        field2._f.mount = value2;
      }
    };
    updateMounted(name, true);
    if (_shouldUnregisterField) {
      const value2 = cloneObject(get(control._defaultValues, name, get(control._options.defaultValues, name, _props.current.defaultValue)));
      set(control._defaultValues, name, value2);
      if (isUndefined(get(control._formValues, name))) {
        set(control._formValues, name, value2);
      }
    }
    !isArrayField && control.register(name);
    return () => {
      (isArrayField ? _shouldUnregisterField && !control._state.action : _shouldUnregisterField) ? control.unregister(name) : updateMounted(name, false);
    };
  }, [name, control, isArrayField, shouldUnregister]);
  React2.useEffect(() => {
    control._setDisabledField({
      disabled,
      name
    });
  }, [disabled, name, control]);
  return React2.useMemo(() => ({
    field,
    formState,
    fieldState
  }), [field, formState, fieldState]);
}
const Controller = (props) => props.render(useController(props));
const HookFormContext = React2.createContext(null);
HookFormContext.displayName = "HookFormContext";
const useFormContext = () => React2.useContext(HookFormContext);
const FormProvider = (props) => {
  const { children, watch, getValues, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, handleSubmit, unregister, control, register, setFocus, subscribe } = props;
  const memoizedValue = React2.useMemo(() => ({
    watch,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    setValue,
    setValues,
    trigger,
    formState,
    resetField,
    reset,
    handleSubmit,
    unregister,
    control,
    register,
    setFocus,
    subscribe
  }), [
    clearErrors,
    control,
    formState,
    getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    setValues,
    subscribe,
    trigger,
    unregister,
    watch
  ]);
  return React2.createElement(
    HookFormContext.Provider,
    { value: memoizedValue },
    React2.createElement(HookFormControlContext.Provider, { value: memoizedValue.control }, children)
  );
};
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...errors[name] && errors[name].types ? errors[name].types : {},
    [type]: message || true
  }
} : {};
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
  let _observers = [];
  const next = (value) => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = (observer) => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o2) => o2 !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
};
function extractFormValues(fieldsState, formValues) {
  const values = {};
  for (const key in fieldsState) {
    if (fieldsState.hasOwnProperty(key)) {
      const fieldState = fieldsState[key];
      const fieldValue = formValues[key];
      if (fieldState && isObject(fieldState) && fieldValue) {
        const nestedFieldsState = extractFormValues(fieldState, fieldValue);
        if (isObject(nestedFieldsState)) {
          values[key] = nestedFieldsState;
        }
      } else if (fieldsState[key]) {
        values[key] = fieldValue;
      }
    }
  }
  return values;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isHTMLElement = (value) => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    if (isNullOrUndefined(object)) {
      object = void 0;
      break;
    }
    object = object[updatePath[index]];
    index++;
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  if (isString(path) && Object.prototype.hasOwnProperty.call(object, path)) {
    delete object[path];
    return object;
  }
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var objectHasFunction = (data) => {
  for (const key in data) {
    if (isFunction$1(data[key])) {
      return true;
    }
  }
  return false;
};
function isTraversable(value) {
  return Array.isArray(value) || isObject(value) && !objectHasFunction(value);
}
function markFieldsDirty(data, fields = {}) {
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      fields[key] = Array.isArray(value) ? [] : {};
      markFieldsDirty(value, fields[key]);
    } else if (!isUndefined(value)) {
      fields[key] = true;
    }
  }
  return fields;
}
function pruneDirtyFields(value) {
  if (value === false) {
    return void 0;
  }
  if (value === true) {
    return true;
  }
  if (Array.isArray(value)) {
    const result = value.map((value2) => pruneDirtyFields(value2));
    return result.some((value2) => value2 !== void 0) ? result : void 0;
  }
  if (isObject(value)) {
    const result = {};
    for (const key in value) {
      const pruned = pruneDirtyFields(value[key]);
      if (!isUndefined(pruned)) {
        result[key] = pruned;
      }
    }
    return Object.keys(result).length ? result : void 0;
  }
  return void 0;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
  if (!dirtyFieldsFromValues) {
    dirtyFieldsFromValues = markFieldsDirty(formValues);
  }
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
        dirtyFieldsFromValues[key] = markFieldsDirty(value, Array.isArray(value) ? [] : {});
      } else {
        getDirtyFields(value, isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
      }
    } else {
      const formValue = formValues[key];
      dirtyFieldsFromValues[key] = !deepEqual(value, formValue);
    }
  }
  return pruneDirtyFields(dirtyFieldsFromValues) || {};
}
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
      return { value: values, isValid: !!values.length };
    }
    return options[0].checked && !options[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult
    ) : defaultResult;
  }
  return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
  const ref = _f.ref;
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
const ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => !!fieldReference && !!fieldReference.validate && !!(isFunction$1(fieldReference.validate) && fieldReference.validate.constructor.name === ASYNC_FUNCTION || isObject(fieldReference.validate) && Object.values(fieldReference.validate).find((validateFunction) => validateFunction.constructor.name === ASYNC_FUNCTION));
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some((watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const { _f, ...currentField } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          return true;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          return true;
        } else {
          if (iterateFieldsByAction(currentField, action)) {
            break;
          }
        }
      } else if (isObject(currentField)) {
        if (iterateFieldsByAction(currentField, action)) {
          break;
        }
      }
    }
  }
  return;
};
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split(".");
  while (names.length) {
    const fieldName = names.join(".");
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    if (foundError && foundError.root && foundError.root.type) {
      return {
        name: `${fieldName}.root`,
        error: foundError.root
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const { name, ...formState } = formStateData;
  return isEmptyObject(formState) || isRoot && Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
  const fieldArrayErrors = convertToArrayPayload(get(errors, name));
  set(fieldArrayErrors, ROOT_ERROR_TYPE, error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
function getValidateError(result, ref, type = "validate") {
  if (isString(result) || Array.isArray(result) && result.every(isString) || isBoolean(result) && !result) {
    return {
      type,
      message: isString(result) ? result : "",
      ref
    };
  }
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabledFieldNames.has(name)) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = (message) => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      inputRef.setCustomValidity(isBoolean(message) ? "" : message || "");
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox2 = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const { value, message } = isString(required) ? { value: !!required, message: required } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
      const isTime = ref.type == "time";
      const isWeek = ref.type == "week";
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const { value: patternValue, message } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate) {
    if (isFunction$1(validate)) {
      const result = await validate(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const key in validate) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
const defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
const DEFAULT_FORM_STATE = {
  submitCount: 0,
  isDirty: false,
  isReady: false,
  isValidating: false,
  isSubmitted: false,
  isSubmitting: false,
  isSubmitSuccessful: false,
  isValid: false,
  touchedFields: {},
  dirtyFields: {},
  validatingFields: {}
};
function createFormControl(props = {}) {
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction$1(_options.defaultValues),
    errors: _options.errors || {},
    disabled: _options.disabled || false
  };
  let _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false,
    keepIsValid: false
  };
  let _names = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set(),
    registerName: /* @__PURE__ */ new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  const defaultProxyFormState = {
    isDirty: false,
    dirtyFields: false,
    validatingFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  const _proxyFormState = {
    ...defaultProxyFormState
  };
  let _proxySubscribeFormState = {
    ..._proxyFormState
  };
  const _subjects = {
    array: createSubject(),
    state: createSubject()
  };
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = (callback) => (wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _setValid = async (shouldUpdateValid) => {
    if (_state.keepIsValid) {
      return;
    }
    if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
      let isValid;
      if (_options.resolver) {
        isValid = isEmptyObject((await _runSchema()).errors);
        _updateIsValidating();
      } else {
        isValid = await executeBuiltInValidation({
          fields: _fields,
          onlyCheckValid: true,
          eventType: EVENTS.VALID
        });
      }
      if (isValid !== _formState.isValid) {
        _subjects.state.next({
          isValid
        });
      }
    }
  };
  const _updateIsValidating = (names, isValidating) => {
    if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
      (names || Array.from(_names.mount)).forEach((name) => {
        if (name) {
          isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
        }
      });
      _subjects.state.next({
        validatingFields: _formState.validatingFields,
        isValidating: !isEmptyObject(_formState.validatingFields)
      });
    }
  };
  const _updateDirtyFields = () => {
    _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
  };
  const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
    if (args && method && !_options.disabled) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
        _updateDirtyFields();
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const _setErrors = (errors) => {
    _formState.errors = errors;
    _subjects.state.next({
      errors: _formState.errors,
      isValid: false
    });
  };
  const hasExplicitNullIntermediate = (name) => {
    const segments = isKey(name) ? [name] : stringToPath(name);
    let formValues = _formValues;
    let defaultValues = _defaultValues;
    for (let i2 = 0; i2 < segments.length - 1; i2++) {
      const key = segments[i2];
      formValues = isNullOrUndefined(formValues) ? formValues : formValues[key];
      defaultValues = isNullOrUndefined(defaultValues) ? defaultValues : defaultValues[key];
      if (formValues === null && defaultValues !== null) {
        return true;
      }
    }
    return false;
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      if (hasExplicitNullIntermediate(name)) {
        return;
      }
      const wasUnsetInFormValues = isUndefined(get(_formValues, name));
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      if (_state.mount && !_state.action) {
        _setValid();
        if (wasUnsetInFormValues && _formState.isDirty && (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty)) {
          const isDirty = _getDirty();
          if (!isDirty) {
            _formState.isDirty = false;
            _subjects.state.next({ ..._formState });
          }
        }
      }
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!_options.disabled) {
      if (!isBlurEvent || shouldDirty) {
        if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
          isPreviousDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = _getDirty();
          shouldUpdateField = isPreviousDirty !== output.isDirty;
        }
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        isPreviousDirty = !!get(_formState.dirtyFields, name);
        if (isCurrentFieldPristine !== _formState.isDirty) {
          _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
        } else {
          isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        }
        output.dirtyFields = _formState.dirtyFields;
        shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
      }
      if (isBlurEvent) {
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (!isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isBlurEvent);
          output.touchedFields = _formState.touchedFields;
          shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
        }
      }
      shouldUpdateField && shouldRender && _subjects.state.next(output);
    }
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid) && _formState.isValid !== isValid;
    if (_options.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(_options.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...shouldUpdateValid && isBoolean(isValid) ? { isValid } : {},
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
  };
  const _runSchema = async (name) => {
    _updateIsValidating(name, true);
    return await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
  };
  const executeSchemaAndUpdateState = async (names) => {
    const { errors } = await _runSchema(names);
    _updateIsValidating(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? _names.array.has(name) && isObject(error) ? updateFieldArrayRootError(_formState.errors, { [name]: error }, name) : set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const validateForm = async ({ name, eventType }) => {
    if (props.validate) {
      const result = await props.validate({
        formValues: _formValues,
        formState: _formState,
        name,
        eventType
      });
      if (isObject(result)) {
        for (const key in result) {
          const error = result[key];
          if (error) {
            setError(`${FORM_ERROR_TYPE}.${key}`, {
              message: isString(error.message) ? error.message : "",
              type: error.type || INPUT_VALIDATION_RULES.validate
            });
          }
        }
      } else if (isString(result) || !result) {
        setError(FORM_ERROR_TYPE, {
          message: result || "",
          type: INPUT_VALIDATION_RULES.validate
        });
      } else {
        clearErrors(FORM_ERROR_TYPE);
      }
      return result;
    }
    return true;
  };
  const executeBuiltInValidation = async ({ fields, onlyCheckValid, name, eventType, context = {
    valid: true,
    runRootValidation: false
  } }) => {
    if (props.validate) {
      context.runRootValidation = true;
      const result = await validateForm({
        name,
        eventType
      });
      if (!result) {
        context.valid = false;
        if (onlyCheckValid) {
          return context.valid;
        }
      }
    }
    for (const name2 in fields) {
      const field = fields[name2];
      if (field) {
        const { _f, ...fieldValue } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const isPromiseFunction = field._f && hasPromiseValidation(field._f);
          const shouldTrackIsValidatingState = _proxyFormState.validatingFields || _proxyFormState.isValidating || _proxySubscribeFormState.validatingFields || _proxySubscribeFormState.isValidating;
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name], true);
          }
          const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !onlyCheckValid, isFieldArrayRoot);
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name]);
          }
          if (fieldError[_f.name]) {
            context.valid = false;
            if (onlyCheckValid) {
              break;
            }
          }
          !onlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
          if (props.shouldUseNativeValidation && fieldError[_f.name]) {
            break;
          }
        }
        !isEmptyObject(fieldValue) && await executeBuiltInValidation({
          context,
          onlyCheckValid,
          fields: fieldValue,
          name: name2,
          eventType
        });
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = /* @__PURE__ */ new Set();
  };
  const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
  }, isGlobal, defaultValue);
  const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = (name, value, options = {}, skipClone = false) => {
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.forEach((checkboxRef) => {
              if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                if (Array.isArray(fieldValue)) {
                  checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                } else {
                  checkboxRef.checked = fieldValue === checkboxRef.value || !!fieldValue;
                }
              }
            });
          } else {
            fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = "";
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type) {
            _subjects.state.next({
              name,
              values: skipClone ? _formValues : cloneObject(_formValues)
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
    options.shouldValidate && trigger(name);
  };
  const setFieldValues = (name, value, options, skipClone = false) => {
    for (const fieldKey in value) {
      if (!value.hasOwnProperty(fieldKey)) {
        return;
      }
      const fieldValue = value[fieldKey];
      const fieldName = name + "." + fieldKey;
      const field = get(_fields, fieldName);
      (_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setFieldValues(fieldName, fieldValue, options, skipClone) : setFieldValue(fieldName, fieldValue, options, skipClone);
    }
  };
  const _setValue = (name, value, options, skipClone) => {
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = skipClone ? value : cloneObject(value);
    const previousValue = get(_formValues, name);
    const isValueUnchanged = deepEqual(previousValue, cloneValue);
    if (!isValueUnchanged) {
      set(_formValues, name, cloneValue);
    }
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: skipClone ? _formValues : cloneObject(_formValues)
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) {
        _updateDirtyFields();
        _subjects.state.next({
          name,
          dirtyFields: _formState.dirtyFields,
          isDirty: _getDirty(name, cloneValue)
        });
      }
    } else {
      const isEmpty = Array.isArray(cloneValue) && !cloneValue.length || isEmptyObject(cloneValue);
      if (!field || field._f || isNullOrUndefined(cloneValue) || isEmpty) {
        setFieldValue(name, cloneValue, options, skipClone);
      } else {
        setFieldValues(name, cloneValue, options, skipClone);
      }
    }
    if (!isValueUnchanged) {
      const watched = isWatched(name, _names);
      const values = skipClone ? _formValues : cloneObject(_formValues);
      _subjects.state.next({
        ...watched && _formState,
        name: _state.mount || watched ? name : void 0,
        values
      });
    }
  };
  const setValue = (name, value, options = {}) => _setValue(name, value, options, false);
  const setValues = (formValues, options = {}) => {
    const updatedFormValues = isFunction$1(formValues) ? formValues(_formValues) : formValues;
    if (!deepEqual(_formValues, updatedFormValues)) {
      _formValues = {
        ..._formValues,
        ...updatedFormValues
      };
      for (const fieldName of _names.mount) {
        _setValue(fieldName, get(updatedFormValues, fieldName), options, true);
      }
      _subjects.state.next({
        ..._formState,
        name: void 0,
        type: void 0,
        values: _formValues
      });
      if (options.shouldValidate) {
        _setValid();
      }
    }
  };
  const onChange = async (event) => {
    _state.mount = true;
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const _updateIsFieldValueUpdated = (fieldValue) => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
    };
    const validationModeBeforeSubmit = getValidationModes(_options.mode);
    const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    if (field) {
      let error;
      let isValid;
      const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const shouldSkipValidation = !hasValidation(field._f) && !props.validate && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        if (!target || !target.readOnly) {
          field._f.onBlur && field._f.onBlur(event);
          delayErrorCallback && delayErrorCallback(0);
        }
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.state.next({
        name,
        type: event.type,
        values: cloneObject(_formValues)
      });
      if (shouldSkipValidation) {
        if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
          if (_options.mode === "onBlur") {
            if (isBlurEvent) {
              _setValid();
            }
          } else if (!isBlurEvent) {
            _setValid();
          }
        }
        return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
      }
      if (!_options.resolver && props.validate) {
        await validateForm({
          name,
          eventType: event.type
        });
      }
      !isBlurEvent && watched && _subjects.state.next({ ..._formState });
      if (_options.resolver) {
        const { errors } = await _runSchema([name]);
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
          const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
          error = errorLookupResult.error;
          name = errorLookupResult.name;
          isValid = isEmptyObject(errors);
        }
      } else {
        _updateIsValidating([name], true);
        error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid = false;
          } else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
            isValid = await executeBuiltInValidation({
              fields: _fields,
              onlyCheckValid: true,
              name,
              eventType: event.type
            });
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && (!Array.isArray(field._f.deps) || field._f.deps.length > 0) && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async (name, options = {}) => {
    let isValid;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation({
          fields: field && field._f ? { [fieldName]: field } : field,
          eventType: EVENTS.TRIGGER
        });
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _setValid();
    } else {
      validationResult = isValid = await executeBuiltInValidation({
        fields: _fields,
        name,
        eventType: EVENTS.TRIGGER
      });
    }
    _subjects.state.next({
      ...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid ? {} : { name },
      ..._options.resolver || !name ? { isValid } : {},
      errors: _formState.errors
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = (fieldNames, config2) => {
    let values = {
      ..._state.mount ? _formValues : _defaultValues
    };
    if (config2) {
      values = extractFormValues(config2.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
    }
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    error: get((formState || _formState).errors, name),
    isValidating: !!get(_formState.validatingFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name)
  });
  const clearErrors = (name) => {
    const names = name ? convertToArrayPayload(name) : void 0;
    names === null || names === void 0 ? void 0 : names.forEach((inputName) => unset(_formState.errors, inputName));
    if (names) {
      names.forEach((inputName) => {
        _subjects.state.next({
          name: inputName,
          errors: _formState.errors
        });
      });
    } else {
      _subjects.state.next({
        errors: {}
      });
    }
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
    const currentError = get(_formState.errors, name) || {};
    const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
    set(_formState.errors, name, {
      ...restOfErrorTree,
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => isFunction$1(name) ? _subjects.state.subscribe({
    next: (payload) => "values" in payload && name(payload.values || _getWatch(void 0, defaultValue), payload)
  }) : _getWatch(name, defaultValue, true);
  const _subscribe = (props2) => _subjects.state.subscribe({
    next: (formState) => {
      if (shouldSubscribeByName(props2.name, formState.name, props2.exact) && shouldRenderFormState(formState, props2.formState || _proxyFormState, _setFormState, props2.reRenderRoot)) {
        const snapshot = { ..._formValues };
        props2.callback({
          values: snapshot,
          ..._formState,
          ...formState,
          defaultValues: _defaultValues
        });
      }
    }
  }).unsubscribe;
  const subscribe = (props2) => {
    _state.mount = true;
    _proxySubscribeFormState = {
      ..._proxySubscribeFormState,
      ...props2.formState
    };
    return _subscribe({
      ...props2,
      formState: {
        ...defaultProxyFormState,
        ...props2.formState
      }
    });
  };
  const unregister = (name, options = {}) => {
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !options.keepIsValidating && unset(_formState.validatingFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.state.next({
      values: cloneObject(_formValues)
    });
    _subjects.state.next({
      ..._formState,
      ...!options.keepDirty ? {} : { isDirty: _getDirty() }
    });
    !options.keepIsValid && _setValid();
  };
  const _setDisabledField = ({ disabled, name }) => {
    if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) {
      const wasDisabled = _names.disabled.has(name);
      const isDisabled = !!disabled;
      const disabledStateChanged = wasDisabled !== isDisabled;
      disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
      disabledStateChanged && _state.mount && !_state.action && _setValid();
    }
  };
  const register = (name, options = {}) => {
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
    const shouldRevalidateRemount = !_names.registerName.has(name) && field && field._f && !field._f.mount;
    set(_fields, name, {
      ...field || {},
      _f: {
        ...field && field._f ? field._f : { ref: { name } },
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field && !shouldRevalidateRemount) {
      _setDisabledField({
        disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
      ..._options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {},
      name,
      onChange,
      onBlur: onChange,
      ref: (ref) => {
        if (ref) {
          _names.registerName.add(name);
          register(name, options);
          _names.registerName.delete(name);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...radioOrCheckbox ? {
                refs: [
                  ...refs.filter(live),
                  fieldRef,
                  ...Array.isArray(get(_defaultValues, name)) ? [{}] : []
                ],
                ref: { type: fieldRef.type, name }
              } : { ref: fieldRef }
            }
          });
          updateValidAndValue(name, false, void 0, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && !_options.shouldUseNativeValidation && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = (disabled) => {
    if (isBoolean(disabled)) {
      _subjects.state.next({ disabled });
      iterateFieldsByAction(_fields, (ref, name) => {
        const currentField = get(_fields, name);
        if (currentField) {
          ref.disabled = currentField._f.disabled || disabled;
          if (Array.isArray(currentField._f.refs)) {
            currentField._f.refs.forEach((inputRef) => {
              inputRef.disabled = currentField._f.disabled || disabled;
            });
          }
        }
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async (e) => {
    let onValidError = void 0;
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const { errors, values } = await _runSchema();
      _updateIsValidating();
      _formState.errors = errors;
      fieldValues = cloneObject(values);
    } else {
      await executeBuiltInValidation({
        fields: _fields,
        eventType: EVENTS.SUBMIT
      });
    }
    if (_names.disabled.size) {
      for (const name of _names.disabled) {
        unset(fieldValues, name);
      }
    }
    unset(_formState.errors, ROOT_ERROR_TYPE);
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      try {
        await onValid(fieldValues, e);
      } catch (error) {
        onValidError = error;
      }
    } else {
      if (onInvalid) {
        await onInvalid({ ..._formState.errors }, e);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
    if (onValidError) {
      throw onValidError;
    }
  };
  const resetField = (name, options = {}) => {
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, cloneObject(get(_defaultValues, name)));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, cloneObject(options.defaultValue));
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _setValid();
      }
      _subjects.state.next({ ..._formState });
    }
  };
  const _reset = (formValues, keepStateOptions = {}) => {
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const isEmptyResetValues = isEmptyObject(formValues);
    const values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues) {
        const fieldsToCheck = /* @__PURE__ */ new Set([
          ..._names.mount,
          ...Object.keys(getDirtyFields(_defaultValues, _formValues))
        ]);
        for (const fieldName of Array.from(fieldsToCheck)) {
          const isDirty = get(_formState.dirtyFields, fieldName);
          const existingValue = get(_formValues, fieldName);
          const newValue = get(values, fieldName);
          if (isDirty && !isUndefined(existingValue)) {
            set(values, fieldName, existingValue);
          } else if (!isDirty && !isUndefined(newValue)) {
            setValue(fieldName, newValue);
          }
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest("form");
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            setValue(fieldName, get(values, fieldName));
          }
        } else {
          _fields = {};
        }
      }
      _formValues = _options.shouldUnregister ? keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {} : cloneObject(values);
      _subjects.array.next({
        values: { ...values }
      });
      _subjects.state.next({
        values: { ...values }
      });
    }
    _names = {
      mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      registerName: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: false,
      focus: ""
    };
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues || !_options.shouldUnregister && !isEmptyObject(values);
    _state.watch = !!_options.shouldUnregister;
    _state.keepIsValid = !!keepStateOptions.keepIsValid;
    _state.action = false;
    if (!keepStateOptions.keepErrors) {
      _formState.errors = {};
    }
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false,
      defaultValues: _defaultValues
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction$1(formValues) ? formValues(_formValues) : formValues, { ..._options.resetOptions, ...keepStateOptions });
  const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        setTimeout(() => {
          fieldRef.focus();
          options.shouldSelect && isFunction$1(fieldRef.select) && fieldRef.select();
        });
      }
    }
  };
  const _setFormState = (updatedFormState) => {
    _formState = {
      ..._formState,
      ...updatedFormState
    };
  };
  const _resetDefaultValues = () => isFunction$1(_options.defaultValues) && _options.defaultValues().then((values) => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  const methods = {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _subscribe,
      _runSchema,
      _updateIsValidating,
      _focusError,
      _getWatch,
      _getDirty,
      _setValid,
      _setFieldArray,
      _setDisabledField,
      _setErrors,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _removeUnmounted,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
      }
    },
    subscribe,
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    resetField,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
  return {
    ...methods,
    formControl: methods
  };
}
function useForm(props = {}) {
  const _formControl = React2.useRef(void 0);
  const _values = React2.useRef(void 0);
  const [formState, updateFormState] = React2.useState(() => ({
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction$1(props.defaultValues),
    errors: props.errors || {},
    disabled: props.disabled || false,
    defaultValues: isFunction$1(props.defaultValues) ? void 0 : props.defaultValues
  }));
  if (!_formControl.current) {
    if (props.formControl) {
      _formControl.current = {
        ...props.formControl,
        formState
      };
      if (props.defaultValues && !isFunction$1(props.defaultValues)) {
        props.formControl.reset(props.defaultValues, props.resetOptions);
      }
    } else {
      const { formControl, ...rest } = createFormControl(props);
      _formControl.current = {
        ...rest,
        formState
      };
    }
  }
  const control = _formControl.current.control;
  control._options = props;
  useIsomorphicLayoutEffect(() => {
    const sub = control._subscribe({
      formState: control._proxyFormState,
      callback: () => updateFormState({
        ...control._formState,
        defaultValues: control._defaultValues
      }),
      reRenderRoot: true
    });
    updateFormState((data) => ({
      ...data,
      isReady: true
    }));
    control._formState.isReady = true;
    return sub;
  }, [control]);
  React2.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  React2.useEffect(() => {
    if (props.mode) {
      control._options.mode = props.mode;
    }
    if (props.reValidateMode) {
      control._options.reValidateMode = props.reValidateMode;
    }
  }, [control, props.mode, props.reValidateMode]);
  React2.useEffect(() => {
    if (props.errors) {
      control._setErrors(props.errors);
      control._focusError();
    }
  }, [control, props.errors]);
  React2.useEffect(() => {
    props.shouldUnregister && control._subjects.state.next({
      values: control._getWatch()
    });
  }, [control, props.shouldUnregister]);
  React2.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty = control._getDirty();
      if (isDirty !== formState.isDirty) {
        control._subjects.state.next({
          isDirty
        });
      }
    }
  }, [control, formState.isDirty]);
  React2.useEffect(() => {
    var _a;
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, {
        keepFieldsRef: true,
        ...control._options.resetOptions
      });
      if (!((_a = control._options.resetOptions) === null || _a === void 0 ? void 0 : _a.keepIsValid)) {
        control._setValid();
      }
      _values.current = props.values;
      updateFormState((state) => ({ ...state }));
    } else {
      control._resetDefaultValues();
    }
  }, [control, props.values]);
  React2.useEffect(() => {
    if (!control._state.mount) {
      control._setValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({ ...control._formState });
    }
    control._removeUnmounted();
  });
  _formControl.current.formState = React2.useMemo(() => getProxyFormState(formState, control), [control, formState]);
  return _formControl.current;
}
const r = (t2, r2, o2) => {
  if (t2 && "reportValidity" in t2) {
    const s2 = get(o2, r2);
    t2.setCustomValidity(s2 && s2.message || ""), t2.reportValidity();
  }
}, o = (e, t2) => {
  for (const o2 in t2.fields) {
    const s2 = t2.fields[o2];
    s2 && s2.ref && "reportValidity" in s2.ref ? r(s2.ref, o2, e) : s2 && s2.refs && s2.refs.forEach((t3) => r(t3, o2, e));
  }
}, s$1 = (r2, s2) => {
  s2.shouldUseNativeValidation && o(r2, s2);
  const n2 = {};
  for (const o2 in r2) {
    const c = get(s2.fields, o2), f = Object.assign(r2[o2] || {}, { ref: c && c.ref });
    if (i$1(s2.names || Object.keys(r2), o2)) {
      const r3 = Object.assign({}, get(n2, o2));
      set(r3, "root", f), set(n2, o2, r3);
    } else set(n2, o2, f);
  }
  return n2;
}, i$1 = (e, t2) => {
  const r2 = n(t2).replace(/[.*+?^${}()|\\]/g, "\\$&");
  return e.some((e2) => n(e2).match(`^${r2}\\.\\d+`));
};
function n(e) {
  return e.replace(/[\[\]]/g, "");
}
function $constructor(name, initializer2, params) {
  function init(inst, def) {
    var _a;
    Object.defineProperty(inst, "_zod", {
      value: inst._zod ?? {},
      enumerable: false
    });
    (_a = inst._zod).traits ?? (_a.traits = /* @__PURE__ */ new Set());
    inst._zod.traits.add(name);
    initializer2(inst, def);
    for (const k in _.prototype) {
      if (!(k in inst))
        Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
    }
    inst._zod.constr = _;
    inst._zod.def = def;
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}
const globalConfig = {};
function config(newConfig) {
  return globalConfig;
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
const captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {
};
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
const initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  Object.defineProperty(inst, "message", {
    get() {
      return JSON.stringify(def, jsonStringifyReplacer, 2);
    },
    enumerable: true
    // configurable: false,
  });
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
const $ZodError = $constructor("$ZodError", initializer);
const $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
const _parse = (_Err) => (schema2, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema2._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
const parse = /* @__PURE__ */ _parse($ZodRealError);
const _parseAsync = (_Err) => async (schema2, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema2._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
const parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
function t() {
  return t = Object.assign ? Object.assign.bind() : function(r2) {
    for (var e = 1; e < arguments.length; e++) {
      var n2 = arguments[e];
      for (var o2 in n2) ({}).hasOwnProperty.call(n2, o2) && (r2[o2] = n2[o2]);
    }
    return r2;
  }, t.apply(null, arguments);
}
function s(r2, e) {
  try {
    var n2 = r2();
  } catch (r3) {
    return e(r3);
  }
  return n2 && n2.then ? n2.then(void 0, e) : n2;
}
function i(r2, e) {
  for (var o2 = {}; r2.length; ) {
    var t2 = r2[0], s2 = t2.code, i2 = t2.message, a2 = t2.path.join(".");
    if (!o2[a2]) if ("unionErrors" in t2) {
      var u2 = t2.unionErrors[0].errors[0];
      o2[a2] = { message: u2.message, type: u2.code };
    } else o2[a2] = { message: i2, type: s2 };
    if ("unionErrors" in t2 && t2.unionErrors.forEach(function(e2) {
      return e2.errors.forEach(function(e3) {
        return r2.push(e3);
      });
    }), e) {
      var c = o2[a2].types, f = c && c[t2.code];
      o2[a2] = appendErrors(a2, e, o2, s2, f ? [].concat(f, t2.message) : t2.message);
    }
    r2.shift();
  }
  return o2;
}
function a(r2, e) {
  for (var o2 = {}, s2 = function() {
    var s3 = r2[0], i2 = s3.code, a2 = s3.message, u2 = s3.path.join(".");
    if (!o2[u2]) if ("invalid_union" === s3.code && s3.errors.length > 0) {
      var c = s3.errors[0][0];
      o2[u2] = { message: c.message, type: c.code };
    } else o2[u2] = { message: a2, type: i2 };
    if ("invalid_union" === s3.code && s3.errors.forEach(function(e2) {
      return e2.forEach(function(e3) {
        return r2.push(t({}, e3, { path: [].concat(s3.path, e3.path) }));
      });
    }), e) {
      var f = o2[u2].types, l = f && f[s3.code];
      o2[u2] = appendErrors(u2, e, o2, i2, l ? [].concat(l, s3.message) : s3.message);
    }
    r2.shift();
  }; r2.length; ) s2();
  return o2;
}
function u(n2, t2, u2) {
  if (void 0 === u2 && (u2 = {}), (function(r2) {
    return "_def" in r2 && "object" == typeof r2._def && "typeName" in r2._def;
  })(n2)) return function(o$1, a2, c) {
    try {
      return Promise.resolve(s(function() {
        return Promise.resolve(n2["sync" === u2.mode ? "parse" : "parseAsync"](o$1, t2)).then(function(e) {
          return c.shouldUseNativeValidation && o({}, c), { errors: {}, values: u2.raw ? Object.assign({}, o$1) : e };
        });
      }, function(r2) {
        if ((function(r3) {
          return Array.isArray(null == r3 ? void 0 : r3.issues);
        })(r2)) return { values: {}, errors: s$1(i(r2.errors, !c.shouldUseNativeValidation && "all" === c.criteriaMode), c) };
        throw r2;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
  if ((function(r2) {
    return "_zod" in r2 && "object" == typeof r2._zod;
  })(n2)) return function(i2, c, f) {
    try {
      return Promise.resolve(s(function() {
        return Promise.resolve(("sync" === u2.mode ? parse : parseAsync)(n2, i2, t2)).then(function(e) {
          return f.shouldUseNativeValidation && o({}, f), { errors: {}, values: u2.raw ? Object.assign({}, i2) : e };
        });
      }, function(r2) {
        if ((function(r3) {
          return r3 instanceof $ZodError;
        })(r2)) return { values: {}, errors: s$1(a(r2.issues, !f.shouldUseNativeValidation && "all" === f.criteriaMode), f) };
        throw r2;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
  throw new Error("Invalid input: not a Zod schema");
}
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$1);
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control?.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const Form = FormProvider;
const FormFieldContext = reactExports.createContext(null);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = reactExports.useContext(FormFieldContext);
  const itemContext = reactExports.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = reactExports.createContext(null);
const FormItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const id = reactExports.useId();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
const FormLabel = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = reactExports.forwardRef(
  ({ asChild: _asChild, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Slot,
      {
        ref,
        id: formItemId,
        "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        ...props
      }
    );
  }
);
FormControl.displayName = "FormControl";
const FormDescription = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = reactExports.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const DRAFT_KEY = "talentra-job-draft";
const JOB_TYPES = [{
  value: "full_time",
  label: "Full-Time"
}, {
  value: "part_time",
  label: "Part-Time"
}, {
  value: "contract",
  label: "Contract"
}, {
  value: "internship",
  label: "Internship"
}, {
  value: "remote",
  label: "Remote"
}, {
  value: "freelance",
  label: "Freelance"
}];
const JOB_CATEGORIES = [{
  value: "software",
  label: "Software & IT"
}, {
  value: "sales",
  label: "Sales & Business Development"
}, {
  value: "marketing",
  label: "Marketing"
}, {
  value: "operations",
  label: "Operations"
}, {
  value: "finance",
  label: "Finance"
}, {
  value: "healthcare",
  label: "Healthcare"
}, {
  value: "education",
  label: "Education"
}, {
  value: "hr",
  label: "HR & Recruitment"
}];
const EXPERIENCE_LEVELS = [{
  value: "entry",
  label: "Entry"
}, {
  value: "mid",
  label: "Mid"
}, {
  value: "senior",
  label: "Senior"
}, {
  value: "executive",
  label: "Executive"
}];
const EDUCATION_LEVELS = [{
  value: "certificate",
  label: "Certificate"
}, {
  value: "diploma",
  label: "Diploma"
}, {
  value: "bachelors",
  label: "Bachelor's"
}, {
  value: "masters",
  label: "Master's"
}, {
  value: "phd",
  label: "PhD"
}, {
  value: "professional",
  label: "Professional"
}];
const CURRENCIES = ["TZS", "USD", "KES", "UGX", "EUR"];
const SALARY_TYPES = [{
  value: "exact",
  label: "Exact"
}, {
  value: "range",
  label: "Range"
}, {
  value: "undisclosed",
  label: "Undisclosed"
}];
const APPLY_METHODS = [{
  value: "email",
  label: "Apply via Email"
}, {
  value: "url",
  label: "External URL"
}, {
  value: "internal",
  label: "Internal Platform"
}];
const JOB_TYPE_TO_CONTRACT = {
  full_time: "permanent",
  part_time: "contract",
  contract: "contract",
  internship: "internship",
  remote: "permanent",
  freelance: "freelance"
};
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const numberOnly = (value) => value.replace(/[^0-9]/g, "");
const formatDisplayNumber = (value) => {
  const number = Number(numberOnly(value));
  if (!number) return "";
  return new Intl.NumberFormat("en-US").format(number);
};
const schema = objectType({
  companyId: stringType().min(1),
  companyName: stringType().optional(),
  companyLogo: stringType().optional(),
  companyWebsite: stringType().optional(),
  industry: stringType().optional(),
  companyLocation: stringType().optional(),
  jobTitle: stringType().min(3),
  slug: stringType(),
  category: stringType().min(1),
  jobType: enumType(JOB_TYPES.map((item) => item.value)),
  location: stringType().min(2),
  salaryType: enumType(SALARY_TYPES.map((item) => item.value)),
  salary: stringType().optional(),
  salaryMin: stringType().optional(),
  salaryMax: stringType().optional(),
  currency: enumType(CURRENCIES),
  description: stringType().min(30),
  requirements: stringType().min(20),
  responsibilities: stringType().min(20),
  experienceLevel: enumType(EXPERIENCE_LEVELS.map((item) => item.value)),
  educationLevel: enumType(EDUCATION_LEVELS.map((item) => item.value)),
  deadline: stringType().optional(),
  applyMethod: enumType(APPLY_METHODS.map((item) => item.value)),
  applyEmail: stringType().optional(),
  applyUrl: stringType().optional(),
  featured: booleanType(),
  urgent: booleanType(),
  remoteFriendly: booleanType()
}).superRefine((data, ctx) => {
  const today = /* @__PURE__ */ new Date();
  if (data.companyId === "new") {
    if (!data.companyName?.trim()) {
      ctx.addIssue({
        path: ["companyName"],
        code: ZodIssueCode.custom,
        message: "Company name is required for a new employer profile."
      });
    }
    if (!data.industry?.trim()) {
      ctx.addIssue({
        path: ["industry"],
        code: ZodIssueCode.custom,
        message: "Industry is required when creating a company."
      });
    }
    if (!data.companyLocation?.trim()) {
      ctx.addIssue({
        path: ["companyLocation"],
        code: ZodIssueCode.custom,
        message: "Company location is required."
      });
    }
  }
  if (data.salaryType === "exact" && !numberOnly(data.salary || "")) {
    ctx.addIssue({
      path: ["salary"],
      code: ZodIssueCode.custom,
      message: "Enter the exact salary amount."
    });
  }
  if (data.salaryType === "range") {
    const min = Number(numberOnly(data.salaryMin || ""));
    const max = Number(numberOnly(data.salaryMax || ""));
    if (!min) {
      ctx.addIssue({
        path: ["salaryMin"],
        code: ZodIssueCode.custom,
        message: "Enter the minimum salary."
      });
    }
    if (!max) {
      ctx.addIssue({
        path: ["salaryMax"],
        code: ZodIssueCode.custom,
        message: "Enter the maximum salary."
      });
    }
    if (min && max && min > max) {
      ctx.addIssue({
        path: ["salaryMax"],
        code: ZodIssueCode.custom,
        message: "Maximum salary must be greater than minimum salary."
      });
    }
  }
  if (data.applyMethod === "email" && !data.applyEmail?.trim()) {
    ctx.addIssue({
      path: ["applyEmail"],
      code: ZodIssueCode.custom,
      message: "Email is required for application by email."
    });
  }
  if (data.applyMethod === "url" && !data.applyUrl?.trim()) {
    ctx.addIssue({
      path: ["applyUrl"],
      code: ZodIssueCode.custom,
      message: "Application URL is required."
    });
  }
  if (data.applyUrl?.trim() && data.applyMethod === "url") {
    try {
      new URL(data.applyUrl);
    } catch {
      ctx.addIssue({
        path: ["applyUrl"],
        code: ZodIssueCode.custom,
        message: "Enter a valid URL."
      });
    }
  }
  if (data.applyEmail?.trim() && data.applyMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.applyEmail)) {
    ctx.addIssue({
      path: ["applyEmail"],
      code: ZodIssueCode.custom,
      message: "Enter a valid email address."
    });
  }
  if (data.deadline) {
    const selected = /* @__PURE__ */ new Date(data.deadline + "T00:00:00");
    if (selected < /* @__PURE__ */ new Date(today.toISOString().split("T")[0] + "T00:00:00")) {
      ctx.addIssue({
        path: ["deadline"],
        code: ZodIssueCode.custom,
        message: "Deadline cannot be in the past."
      });
    }
  }
});
function PostJobPage() {
  const {
    user,
    roles,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = reactExports.useState(1);
  const [previewOpen, setPreviewOpen] = reactExports.useState(false);
  const [logoProgress, setLogoProgress] = reactExports.useState(0);
  const [draftSavedAt, setDraftSavedAt] = reactExports.useState("");
  const [dragging, setDragging] = reactExports.useState(false);
  const {
    data: companies,
    isLoading: companiesLoading
  } = useQuery({
    queryKey: ["my-companies"],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("companies").select("id,name,logo_url,website,industry,location,verified,suspended,premium,jobs(status)").eq("owner_id", user.uid);
      if (error) throw error;
      return data ?? [];
    }
  });
  const form = useForm({
    resolver: u(schema),
    mode: "onBlur",
    defaultValues: {
      companyId: "new",
      companyName: "",
      companyLogo: "",
      companyWebsite: "",
      industry: "",
      companyLocation: "",
      jobTitle: "",
      slug: "",
      category: "software",
      jobType: "full_time",
      location: "",
      salaryType: "undisclosed",
      salary: "",
      salaryMin: "",
      salaryMax: "",
      currency: "TZS",
      description: "",
      requirements: "",
      responsibilities: "",
      experienceLevel: "mid",
      educationLevel: "bachelors",
      deadline: "",
      applyMethod: "email",
      applyEmail: "",
      applyUrl: "",
      featured: false,
      urgent: false,
      remoteFriendly: false
    }
  });
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState
  } = form;
  const values = watch();
  reactExports.useEffect(() => {
    if (!loading && !user) {
      navigate({
        to: "/auth"
      });
    }
  }, [user, loading, navigate]);
  reactExports.useEffect(() => {
    if (!companiesLoading && companies?.length && values.companyId === "new" && !localStorage.getItem(DRAFT_KEY)) {
      setValue("companyId", companies[0].id);
    }
  }, [companies, companiesLoading, values.companyId, setValue]);
  reactExports.useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return;
    try {
      const draft = JSON.parse(saved);
      reset(draft);
      if (draft.slug) {
        setValue("slug", draft.slug);
      }
    } catch {
    }
  }, [reset, setValue]);
  reactExports.useEffect(() => {
    const timer = window.setTimeout(() => {
      const draft = {
        ...values,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setDraftSavedAt((/* @__PURE__ */ new Date()).toLocaleTimeString());
    }, 650);
    return () => window.clearTimeout(timer);
  }, [values]);
  reactExports.useEffect(() => {
    const subscription = watch((value) => {
      const title = value.jobTitle || "";
      setValue("slug", slugify(title));
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);
  const selectedCompany = reactExports.useMemo(() => companies?.find((company) => company.id === values.companyId), [companies, values.companyId]);
  const isNewCompany = values.companyId === "new";
  const salaryValue = numberOnly(values.salary || "");
  const salaryMinValue = numberOnly(values.salaryMin || "");
  const salaryMaxValue = numberOnly(values.salaryMax || "");
  const deadlineMin = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const stepLabels = ["Company", "Job details", "Applications", "Extras"];
  const goNext = async () => {
    const success = await trigger();
    if (!success) return;
    setStep((current) => Math.min(current + 1, 4));
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleLogoUpload = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    setLogoProgress(0);
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        setLogoProgress(Math.round(event.loaded / event.total * 100));
      }
    };
    reader.onload = () => {
      const result = reader.result;
      setValue("companyLogo", result);
      setLogoProgress(100);
      toast.success("Logo ready for your company profile.");
    };
    reader.readAsDataURL(file);
  };
  const renderPreview = (data) => {
    const salaryText = data.salaryType === "undisclosed" ? "Undisclosed" : data.salaryType === "exact" ? `${formatDisplayNumber(data.salary ?? "")} ${data.currency}` : `${formatDisplayNumber(data.salaryMin ?? "")} - ${formatDisplayNumber(data.salaryMax ?? "")} ${data.currency}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4 rounded-3xl border border-border bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-muted-foreground", children: "Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-2xl font-semibold", children: data.jobTitle || "Job title preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: data.companyName || selectedCompany?.name || "Employer name" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-accent" }),
          " ",
          data.category
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", children: data.location || "Tanzania" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Salary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", children: salaryText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Deadline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", children: data.deadline || "Flexible" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 xl:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Why this role matters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground whitespace-pre-wrap", children: data.description || "Describe the impact and mission of this role." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground whitespace-pre-wrap", children: data.requirements || "List the key skills and qualifications." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Responsibilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground whitespace-pre-wrap", children: data.responsibilities || "Explain the core responsibilities of the role." })
          ] })
        ] })
      ] })
    ] });
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-4xl border border-border bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-accent", children: "Section A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-semibold", children: "Company information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Create or choose a polished employer profile for this opening." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-accent" }),
              " Employer branding first"
            ] })
          ] }),
          companies?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "companyId", render: ({
            field
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Employer profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select company or create new" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                companies.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: company.id, children: company.name }, company.id)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "new", children: "Create new company" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Pick an existing company or create a fresh employer profile for this listing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] }) }) : null,
          isNewCompany ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "companyName", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Company name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "TanzaTech Global", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Company name shown to candidates and in search results." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.6fr_1fr]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Company logo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (event) => {
                    event.preventDefault();
                    setDragging(true);
                  }, onDragLeave: () => setDragging(false), onDrop: (event) => {
                    event.preventDefault();
                    setDragging(false);
                    const file = event.dataTransfer.files?.[0];
                    if (file) handleLogoUpload(file);
                  }, className: `group relative overflow-hidden rounded-3xl border-2 border-dashed ${dragging ? "border-accent bg-accent/10" : "border-border bg-background"} transition-all duration-200`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-50 p-6 text-center", children: values.companyLogo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: values.companyLogo, alt: "Logo preview", className: "mx-auto h-28 w-28 rounded-3xl object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-10 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-6 w-6" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Drag & drop or browse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upload a square logo for a polished company listing." })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "absolute inset-0 h-full w-full cursor-pointer opacity-0", "aria-label": "Upload company logo", onChange: (event) => {
                      const file = event.target.files?.[0];
                      if (file) handleLogoUpload(file);
                    } })
                  ] }),
                  logoProgress > 0 && logoProgress < 100 ? /* @__PURE__ */ jsxRuntimeExports.jsx("progress", { "aria-label": "Logo upload progress", className: "logo-upload-progress mt-3 block h-2 w-full overflow-hidden rounded-full", max: 100, value: logoProgress }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Optional logo upload for stronger employer recognition." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "companyWebsite", render: ({
                  field
                }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Website or company link" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "https://talentra.co", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "industry", render: ({
                  field
                }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Industry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose industry" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDUSTRIES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, children: item.en }, item.value)) })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "companyLocation", render: ({
                  field
                }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Company location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Dar es Salaam", ...field }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
                ] }) })
              ] })
            ] })
          ] }) : selectedCompany ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-6 rounded-3xl border border-border bg-muted p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 overflow-hidden rounded-3xl bg-background shadow-sm", children: selectedCompany.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedCompany.logo_url, alt: selectedCompany.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-sm font-semibold text-muted-foreground", children: "Logo" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: selectedCompany.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedCompany.website || "No website set" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
              selectedCompany.verified ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-slate-500" }),
              selectedCompany.verified ? "Verified employer" : "Profile not verified"
            ] })
          ] }) }) : null
        ] });
      case 2:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-4xl border border-border bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-accent", children: "Section B" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-semibold", children: "Job details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Describe the role clearly so candidates can decide fast." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-accent" }),
              " Modern role presentation"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "jobTitle", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Job title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Senior Product Designer", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Strong titles help the role appear in searches." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "category", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Job category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: JOB_CATEGORIES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "jobType", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Job type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { value: field.value, onValueChange: field.onChange, className: "grid grid-cols-2 gap-2", children: JOB_TYPES.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "rounded-2xl border border-border px-3 py-3 text-sm hover:border-accent hover:text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: option.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: option.label })
                ] }) }, option.value)) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "location", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Work location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Dar es Salaam or remote", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "salaryType", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Salary style" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose salary style" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SALARY_TYPES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, children: item.label }, item.value)) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }),
            values.salaryType === "exact" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "salary", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Exact salary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "1200000", ...field, onChange: (event) => field.onChange(numberOnly(event.target.value)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: formatDisplayNumber(field.value ?? "") ? `Formatted: ${formatDisplayNumber(field.value ?? "")} ${values.currency}` : "Enter the exact amount in numbers." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }) : values.salaryType === "range" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "salaryMin", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Minimum salary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "500000", ...field, onChange: (event) => field.onChange(numberOnly(event.target.value)) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: formatDisplayNumber(field.value ?? "") ? `Formatted: ${formatDisplayNumber(field.value ?? "")} ${values.currency}` : "Lower bound" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "salaryMax", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Maximum salary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "1500000", ...field, onChange: (event) => field.onChange(numberOnly(event.target.value)) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: formatDisplayNumber(field.value ?? "") ? `Formatted: ${formatDisplayNumber(field.value ?? "")} ${values.currency}` : "Upper bound" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "currency", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Currency" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: currency, children: currency }, currency)) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "deadline", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Application deadline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", min: deadlineMin, ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "experienceLevel", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Experience level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXPERIENCE_LEVELS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "educationLevel", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Education level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select education" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EDUCATION_LEVELS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "description", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Job description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 6, placeholder: "What will the successful candidate do?", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Summarize responsibilities and team goals." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  field.value.length,
                  "/1200"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "requirements", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Requirements" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, placeholder: "Must-have skills, experience, and qualifications.", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-xs text-muted-foreground", children: [
                  field.value.length,
                  "/900"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "responsibilities", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Responsibilities" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, placeholder: "Day-to-day expectations and success metrics.", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-xs text-muted-foreground", children: [
                  field.value.length,
                  "/900"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] })
          ] })
        ] });
      case 3:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-4xl border border-border bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-accent", children: "Section C" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-semibold", children: "Application method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Choose how candidates send applications for this role." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-accent" }),
              " Flexible application flow"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "applyMethod", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Application method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { value: field.value, onValueChange: field.onChange, className: "grid gap-3", children: APPLY_METHODS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `group flex items-center justify-between gap-3 rounded-3xl border p-4 text-sm transition ${field.value === option.value ? "border-accent bg-accent/5" : "border-border bg-background hover:border-accent"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: option.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: option.value })
              ] }, option.value)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            values.applyMethod === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "applyEmail", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Employer email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "jobs@talentra.co", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }) : values.applyMethod === "url" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "applyUrl", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "External application link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "https://talentra.co/careers/123", ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Internal platform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Candidates will apply through Talentra and you can review submissions in the employer dashboard." })
            ] })
          ] })
        ] });
      case 4:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-4xl border border-border bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-accent", children: "Section D" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-semibold", children: "Additional options" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Boost visibility with optional premium tags." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" }),
              " Better candidate reach"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "featured", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormItem, { className: "rounded-3xl border border-border p-4 transition hover:border-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-base", children: "Featured job" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Highlight this role in the Talentra feed." })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "urgent", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormItem, { className: "rounded-3xl border border-border p-4 transition hover:border-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-base", children: "Urgent hire" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Mark this role as a priority opening." })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control, name: "remoteFriendly", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormItem, { className: "rounded-3xl border border-border p-4 transition hover:border-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "text-base", children: "Remote friendly" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Appeal to remote-first candidates." })
              ] })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl border border-border bg-background p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Job preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Review the final listing before publishing." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setPreviewOpen((open) => !open), children: previewOpen ? "Hide preview" : "Show preview" })
            ] }),
            previewOpen ? renderPreview(values) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Tap the button to preview how your listing will appear to candidates." })
          ] })
        ] });
      default:
        return null;
    }
  };
  const onSubmit = async (data) => {
    if (!user) return;
    if (data.companyId !== "new" && selectedCompany?.suspended) {
      toast.error("This employer profile has been suspended.");
      return;
    }
    let selectedCompanyId = data.companyId === "new" ? void 0 : data.companyId;
    if (data.companyId === "new") {
      const {
        data: companyData,
        error: companyError
      } = await supabase.from("companies").insert({
        owner_id: user.uid,
        name: data.companyName?.trim() ?? "",
        logo_url: data.companyLogo || null,
        website: data.companyWebsite?.trim() || null,
        industry: data.industry || null,
        location: data.companyLocation || null
      }).select("id").single();
      if (companyError) {
        toast.error(companyError.message);
        return;
      }
      selectedCompanyId = companyData.id;
      if (!roles.includes("employer")) {
        await supabase.from("user_roles").insert({
          user_id: user.uid,
          role: "employer"
        });
      }
    }
    if (!selectedCompanyId) {
      toast.error("Choose or create an employer profile before publishing.");
      return;
    }
    const salaryMin = data.salaryType === "exact" ? Number(salaryValue || 0) : Number(salaryMinValue || 0);
    const salaryMax = data.salaryType === "exact" ? Number(salaryValue || 0) : Number(salaryMaxValue || 0);
    const details = [data.description.trim(), "\n\nRequirements:\n" + data.requirements.trim(), "\n\nResponsibilities:\n" + data.responsibilities.trim()].join("");
    ({
      companyName: data.companyId === "new" ? data.companyName?.trim() ?? "" : selectedCompany?.name ?? "",
      companyLogo: data.companyLogo || selectedCompany?.logo_url || "",
      companyWebsite: data.companyWebsite?.trim() || selectedCompany?.website || "",
      industry: data.industry || selectedCompany?.industry || "",
      jobTitle: data.jobTitle.trim(),
      category: data.category,
      jobType: data.jobType,
      location: data.location.trim(),
      salaryType: data.salaryType,
      salary: data.salaryType === "exact" ? Number(salaryValue || 0) : null,
      salaryMin: data.salaryType === "range" ? Number(salaryMinValue || 0) : data.salaryType === "exact" ? Number(salaryValue || 0) : null,
      salaryMax: data.salaryType === "range" ? Number(salaryMaxValue || 0) : data.salaryType === "exact" ? Number(salaryValue || 0) : null,
      currency: data.currency,
      description: data.description.trim(),
      requirements: data.requirements.trim(),
      responsibilities: data.responsibilities.trim(),
      experienceLevel: data.experienceLevel,
      educationLevel: data.educationLevel,
      deadline: data.deadline || null,
      applyMethod: data.applyMethod,
      applyEmail: data.applyEmail?.trim() || "",
      applyUrl: data.applyUrl?.trim() || "",
      featured: data.featured,
      urgent: data.urgent,
      remoteFriendly: data.remoteFriendly,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const {
      data: jobResult,
      error: jobError
    } = await supabase.from("jobs").insert({
      company_id: selectedCompanyId,
      posted_by: user.uid,
      created_by_role: roles.includes("admin") ? "admin" : "employer",
      title: data.jobTitle.trim(),
      description: details,
      location: data.location.trim(),
      region: null,
      industry: data.industry || "",
      position_level: data.experienceLevel,
      contract_type: JOB_TYPE_TO_CONTRACT[data.jobType],
      qualification: data.educationLevel,
      salary_min: salaryMin || null,
      salary_max: salaryMax || null,
      currency: data.currency,
      salary_negotiable: false,
      deadline: data.deadline || null,
      status: "published",
      featured: data.featured
    }).select("id").single();
    if (jobError || !jobResult?.id) {
      toast.error(jobError?.message ?? "Unable to publish job.");
      return;
    }
    localStorage.removeItem(DRAFT_KEY);
    queryClient.invalidateQueries({
      queryKey: ["my-companies"]
    });
    toast.success("Job published. Talent will discover your opening soon.");
    navigate({
      to: "/jobs/$id",
      params: {
        id: jobResult.id
      }
    });
  };
  companies?.some((company) => company?.premium) ?? false;
  companies?.reduce((sum, company) => sum + (company?.jobs?.filter((job) => job.status === "published").length ?? 0), 0) ?? 0;
  if (loading || companiesLoading || !user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 pb-36 pt-10 lg:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-4xl border border-border bg-white p-6 shadow-sm lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Employer experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-semibold tracking-tight", children: "Post a premium job listing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm text-muted-foreground", children: "A smoother employer workflow optimized for mobile candidates across Tanzania and Africa." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Employer dashboard" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-600", children: [
              "Draft ",
              draftSavedAt ? `saved at ${draftSavedAt}` : "available"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-4", children: stepLabels.map((label, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-slate-100 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${step === index + 1 ? "bg-accent text-white" : "bg-white text-slate-500"}`, children: index + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-slate-500", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "job-post-form", onSubmit: handleSubmit(onSubmit), className: "space-y-8", children: [
        renderStep(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-3xl border border-border bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step < 4 ? "Step by step guidance to publish your role." : "Finalize your listing with a preview and publish." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: goBack, className: "min-w-35", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Back"
            ] }) : null,
            step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: goNext, className: "min-w-35 bg-accent text-accent-foreground hover:bg-accent/90", children: [
              "Continue ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "min-w-35 bg-accent text-accent-foreground hover:bg-accent/90", disabled: formState.isSubmitting, children: formState.isSubmitting ? "Publishing…" : "Publish job" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "flex-1", onClick: goBack, disabled: step === 1, children: "Back" }),
      step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "flex-1 bg-accent text-accent-foreground", onClick: goNext, children: "Continue" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", form: "job-post-form", className: "flex-1 bg-accent text-accent-foreground", disabled: formState.isSubmitting, children: formState.isSubmitting ? "Publishing…" : "Publish" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  PostJobPage as component
};
