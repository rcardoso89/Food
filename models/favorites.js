  // *G)* Navigate to the `models` folder and create a new file called `todo.js`. Create a *Todo* model with columns for _"text"_ `DataTypes.STRING`, and _"complete"_ `DataTypes.BOOLEAN`.


module.exports = function (sequelize, DataTypes) {
	var favorites = sequelize.define("favorites", {
		userid: {
			type: DataTypes.STRING,
		},
		label: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		},
		dietLabels: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		},
		url: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		},
		image: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		}
	});

	// favorites.associate = function(models) {
	// 	// We're saying that a favorites should belong to an Author
	// 	// A favorites can't be created without an Author due to the foreign key constraint
	// 		favorites.belongsTo(models.usertwos, {
	// 			foreignKey: {
	// 				allowNull: false
	// 			}
	// 		});
	// };
	return favorites;
}