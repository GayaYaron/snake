export class ColorPack {
    constructor(id, price, type, colors) {
        this.id = id;
        this.price = price;
        this.type = type;
        this.colors = colors.map(colorEnt => colorEnt.color.value);
    }
}