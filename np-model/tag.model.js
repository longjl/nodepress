/**
 * Tag model module.
 * @file 标签数据模型
 * @module model/tag
 * @author Surmon <https://github.com/surmon-china>
 */
 
const { mongoose } = require('np-core/np-mongodb')
const mongoosePaginate = require('mongoose-paginate')
const autoIncrement = require('mongoose-auto-increment')

// 标签模型
const tagSchema = new mongoose.Schema({

	// 标签名称
	name: { type: String, required: true, validate: /\S+/ },

	// 别名
	slug: { type: String, required: true, validate: /\S+/ },

	// 标签描述
	description: String,

	// 发布日期
	create_at: { type: Date, default: Date.now },

	// 最后修改日期
	update_at: { type: Date },

	// 自定义扩展
	extends: [{
		name: { type: String, validate: /\S+/ },
		value: { type: String, validate: /\S+/ } 
	}]
})

// 翻页 + 自增ID插件配置
tagSchema.plugin(mongoosePaginate)
tagSchema.plugin(autoIncrement.plugin, {
	model: 'Tag',
	field: 'id',
	startAt: 1,
	incrementBy: 1
})

// 时间更新
tagSchema.pre('findOneAndUpdate', function(next) {
	this.findOneAndUpdate({}, { update_at: Date.now() })
	next()
})

// 标签模型
module.exports = mongoose.model('Tag', tagSchema)
