export default class FeatureToggleEntity {
  constructor(id, name, enabled) {
    this.id=id;
    this.name=name;
    this.enabled=enabled;
  }

  static Of(toggle) {
    return new FeatureToggleEntity(toggle['id'], toggle['name'], toggle['enabled']);
  }
}