import closest = require("closest");
import {PointModel} from "./models/PointModel";
import { ROUTING_SCALING_FACTOR } from "./routing/PathFinding";
import * as Path from "paths-js/path";
/**
 * @author Dylan Vorster
 */
export class Toolkit {
	static UID_PREFIX: boolean | string = false;
	static TESTING_MODE_ID = 1;

	public static makeTestsDeterministic(prefix: string){
		Toolkit.UID_PREFIX = prefix;
		Toolkit.TESTING_MODE_ID = 1;
	}

	/**
	 * Generats a unique ID (thanks Stack overflow :3)
	 * @returns {String}
	 */
	public static UID(): string {
		if (Toolkit.UID_PREFIX) {
			Toolkit.TESTING_MODE_ID++;
			return Toolkit.UID_PREFIX+"-" + Toolkit.TESTING_MODE_ID;
		}
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	/**
	 * Finds the closest element as a polyfill
	 *
	 * @param  {Element} element  [description]
	 * @param  {string}  selector [description]
	 */
	public static closest(element: Element, selector: string) {
		if (document.body.closest) {
			return element.closest(selector);
		}
		return closest(element, selector);
	}

	public static generateLinePath(firstPoint: PointModel, lastPoint: PointModel): string {
		return `M${firstPoint.x},${firstPoint.y} L ${lastPoint.x},${lastPoint.y}`;
	}

	public static generateCurvePath(
		firstPoint: PointModel,
		lastPoint: PointModel,
		curvy: number = 0,
	): string {
		return `M${firstPoint.x},${firstPoint.y} C ${firstPoint.x + curvy},${firstPoint.y} ${lastPoint.x +
		-curvy},${lastPoint.y} ${lastPoint.x},${lastPoint.y}`;
	}

	public static generateDynamicPath(pathCoords: number[][]) {
		let path = Path();
		path = path.moveto(pathCoords[0][0] * ROUTING_SCALING_FACTOR, pathCoords[0][1] * ROUTING_SCALING_FACTOR);
		pathCoords.slice(1).forEach(coords => {
			path = path.lineto(coords[0] * ROUTING_SCALING_FACTOR, coords[1] * ROUTING_SCALING_FACTOR);
		});
		return path.print();
	}
}
